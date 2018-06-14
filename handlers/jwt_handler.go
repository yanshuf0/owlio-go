package handlers

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/yanshuf0/owlio-go/utils"
)

type ContextKey string

// getToken string is mainly copied from auth0 jwt middleware function, though it is trivial:
func getTokenString(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return "", nil
	}

	authHeaderParts := strings.Split(authHeader, " ")
	if len(authHeaderParts) != 2 || strings.ToLower(authHeaderParts[0]) != "bearer" {
		return "", errors.New("Authorization header format must be Bearer {token}")
	}

	return authHeaderParts[1], nil
}

// JWTHandler handles authentication of jwts and passes the parsed token down the context.
func JWTHandler(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString, err := getTokenString(r)
		if err != nil {
			utils.ErrorWrite(w, err.Error(), http.StatusBadRequest)
			return
		}
		if tokenString == "" {
			utils.ErrorWrite(w, `No token provided!`, http.StatusBadRequest)
			return
		}
		// Parses the token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Validates the signing method.
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
			return os.Getenv("OWLIO_SECRET"), nil
		})

		if err != nil {
			log.Println(err.Error())
			utils.ErrorWrite(w, `Token is not valid!`, http.StatusBadRequest)
			return
		}

		if !token.Valid {
			utils.ErrorWrite(w, `Token is not valid!`, http.StatusUnauthorized)
			return
		}

		// If token is valid we create a new request that has the parsed token in the context.
		newRequest := r.WithContext(context.WithValue(r.Context(), ContextKey(`token`), token))
		*r = *newRequest

		// Calls next Handler
		h.ServeHTTP(w, r)
	})
}
