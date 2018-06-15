package models

import (
	"fmt"

	"github.com/yanshuf0/owlio-go/models"
	"github.com/yanshuf0/owlio-go/utils"
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
	Email    string        `json:"email" bson:"email"`
	Password string        `json:"password" bson:"password"`
}

// NewUser Adds a new user to the db:
func NewUser(usr *User) error {
	var err error
	if isUsernameTaken(usr.Username) {
		return fmt.Errorf("username taken")
	}
	usr.Password, _ = utils.HashPassword(usr.Password)
	err = cltn.Insert(usr)
	if err != nil {
		return fmt.Errorf("error inserting record")
	}
	return nil
}

// FindUser returns the matching user:
func FindUser(usr *User) (*User, error) {
	storedUser := new(User)
	err := cltn.
		Find(bson.M{"username": bson.RegEx{Pattern: usr.Username, Options: "i"}}).
		One(&storedUser)
	if err != nil {
		return nil, fmt.Errorf("username not found")
	}
	return storedUser, nil
}

func isUsernameTaken(username string) bool {
	if count, _ :=
		cltn.
			Find(bson.M{"username": bson.RegEx{Pattern: username, Options: "i"}}).
			Limit(1).
			Count(); count > 0 {
		return true
	}

	return false
}
