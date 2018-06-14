package utils

import (
	"encoding/json"
	"log"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

type tokenRes struct {
	TokenString string `json:"token"`
}

// TODO: Set secret to be read from file on server with randomly generated 128 bit string.
var secret = []byte(`secret`)

// GenerateToken provides a jwt for authenticated users
func GenerateToken(username string) ([]byte, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString(secret)
	if err != nil {
		log.Println(`Error generating a signed token string!`)
		return nil, err
	}

	jsonToken, _ := json.Marshal(tokenRes{TokenString: tokenString})

	return jsonToken, nil
}
