package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

// ErrorWrite writes errors to the client.
func ErrorWrite(w http.ResponseWriter, errorMessage string, statusCode int) error {
	errObject := ErrorResponse{
		ErrorMessage: errorMessage,
	}
	responseObject, err := json.Marshal(errObject)
	if err != nil {
		log.Println(`Failed to marshal json`)
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	w.Write(responseObject)
	return nil
}
