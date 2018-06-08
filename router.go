package main

import (
	"net/http"

	"github.com/NYTimes/gziphandler"
)

func getRouter() *http.ServeMux {
	mux := http.NewServeMux()
	// gzip assets:
	assetHandler := gziphandler.GzipHandler(http.StripPrefix("/static/", http.FileServer(http.Dir("./web/owlio-spa/build/static"))))

	// Serve spa application:
	mux.Handle("/static/", assetHandler)

	mux.HandleFunc("/service-worker.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/owlio-spa/build/service-worker.js")
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/owlio-spa/build/index.html")
	})

	return mux
}
