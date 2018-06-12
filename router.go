package main

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/NYTimes/gziphandler"
)

func getRouter() *mux.Router {
	mux := mux.NewRouter()
	// Create G-Zip asset handler:
	assetHandler := gziphandler.GzipHandler(http.StripPrefix("/static/", http.FileServer(http.Dir("./web/owlio-spa/build/static"))))

	// Start spa:
	mux.Handle("/static/", assetHandler)

	mux.HandleFunc("/service-worker.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/owlio-spa/build/service-worker.js")
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/owlio-spa/build/index.html")
	})
	// End spa.

	return mux
}