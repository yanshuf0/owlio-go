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
		// Get the tls server. Pass the mux it will use:
		srv := getTLSServer(mux)
		log.Fatal(srv.ListenAndServeTLS("", ""))
	} else {
		log.Fatal(http.ListenAndServe(":8081", mux))
	}
}
