package utils

import (
	"encoding/json"
	"log"
)

// GenerateMessage takes a string and returns the JSON response object we would like.
func GenerateMessage(message string) []byte {
	res, err := json.Marshal(MessageResponse{ResponseMessage: message})
	if err != nil {
		log.Fatal(`Unable to marshal the object`)
	}
	return res
}
