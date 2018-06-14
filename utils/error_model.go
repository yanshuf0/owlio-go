package utils

// ErrorResponse is the object to be sent as a response with errors.
type ErrorResponse struct {
	ErrorMessage string `json:"error"`
}
