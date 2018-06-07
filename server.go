package main

import (
	"log"
	"net/http"
	"time"

	"github.com/yanshuf0/owlio-go/env"
)

func main() {
	// Server configuration:
	if env.Production() {
		srv := &http.Server{
			ReadTimeout:  5 * time.Second,
			WriteTimeout: 10 * time.Second,
			IdleTimeout:  120 * time.Second,
			TLSConfig:    tlsConfig,
			Handler:      http.DefaultServeMux,
			Addr:         ":8080",
		}

		go func() { log.Fatal(srv.ListenAndServeTLS("", "")) }()
	} else {
		// Serve spa application:
		http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./web/owlio-spa/build/static"))))
		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			http.ServeFile(w, r, "./web/owlio-spa/build/index.html")
		})

		log.Fatal(http.ListenAndServe(":8081", nil))
	}
}
