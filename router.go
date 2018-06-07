package main

import (
	"net/http"
)

func getRouter() *http.ServeMux {
	mux := http.NewServeMux()
	// Serve spa application:
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./web/owlio-spa/build/static"))))

	mux.HandleFunc("/service-worker.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/owlio-spa/build/service-worker.js")
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/owlio-spa/build/index.html")
	})

	return mux
}
