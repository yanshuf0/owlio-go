package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	models "github.com/yanshuf0/owlio-go/models/user"
	"github.com/yanshuf0/owlio-go/utils"
)

// Signup handles a signup request:
func Signup(w http.ResponseWriter, r *http.Request) {
	usr := new(models.User)

	dcdr := json.NewDecoder(r.Body)
	dcdr.Decode(&usr)
	err := models.NewUser(usr)
	if err != nil {
		utils.ErrorWrite(w, err.Error(), http.StatusBadRequest)
	} else {
		res := utils.GenerateMessage(fmt.Sprintf("Successfully created user %s", usr.Username))
		utils.ResponseWrite(w, res, http.StatusCreated)
	}
}

// Signin signs in:
func Signin(w http.ResponseWriter, r *http.Request) {
	usr := new(models.User)
	storedUser := new(models.User)

	dcdr := json.NewDecoder(r.Body)
	dcdr.Decode(&usr)
	storedUser, err := models.FindUser(usr)
	if err != nil {
		utils.ErrorWrite(w, err.Error(), http.StatusBadRequest)
	} else {
		if utils.CheckPasswordHash(usr.Password, storedUser.Password) {
			res := utils.GenerateMessage(fmt.Sprintf("Successfully logged in user %s", usr.Username))
			utils.ResponseWrite(w, res, http.StatusOK)
		} else {
			utils.ErrorWrite(w, "invalid password", http.StatusBadRequest)
		}
	}
}
