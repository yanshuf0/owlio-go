package main

import (
	"log"
	"net/http"

	"github.com/yanshuf0/owlio-go/env"
	"github.com/yanshuf0/owlio-go/models"
)

func main() {
	// Get mux from router.go
	rtr := getRouter()
	// Server configuration:
	if env.Production() {
		// Get the tls server. Pass the mux it will use:
		srv := getTLSServer(rtr)
		log.Fatal(srv.ListenAndServeTLS("", ""))
	} else {
		log.Fatal(http.ListenAndServe(":4321", mux))
	}

	// Close db session
	defer models.Db.Session.Close()
}
