package utils

import (
	"net/http"
)

// ResponseWrite takes a writer and sets the headers and writes the data.
func ResponseWrite(w http.ResponseWriter, data []byte, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	w.Write(data)
}
