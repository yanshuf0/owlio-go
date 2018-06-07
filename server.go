package main

import (
	"log"
	"net/http"

	"github.com/yanshuf0/owlio-go/env"
)

func main() {
	// Get mux from router.go
	mux := getRouter()
	// Server configuration:
	if env.Production() {
		srv := getTLSServer()
		go func() { log.Fatal(srv.ListenAndServeTLS("", "")) }()
	} else {
		log.Fatal(http.ListenAndServe(":8081", mux))
	}
}
