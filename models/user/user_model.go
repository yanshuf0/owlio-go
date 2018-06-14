package models

import (
	"fmt"

	"github.com/yanshuf0/owlio-go/models"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

// Specifies the collection we'll be using for authentication.
var cltn = models.Db.C("users")

// Using a diffferent type than string for context key.
type ContextKey string

// User defines user attributes
type User struct {
	ID       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Username string        `json:"username" bson:"username"`
	Password string        `json:"password" bson:"password"`
}

// NewUser Adds a new user to the db:
func NewUser(usr *User) error {
	var err error
	if isUsernameTaken(usr.Username) {
		return fmt.Errorf("username taken")
	}
	usr.Password, _ = hashPassword(usr.Password)
	err = cltn.Insert(usr)
	if err != nil {
		return fmt.Errorf("error inserting record")
	}
	return nil
}

// hashPassword hashes the password for the db.
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// checkPasswordHash checks a password hash
func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func isUsernameTaken(username string) bool {
	if count, _ :=
		cltn.Find(bson.M{"username": bson.RegEx{Pattern: username, Options: "i"}}).Limit(1).Count(); count > 0 {
		return true
	}

	return false
}
