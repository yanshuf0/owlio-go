package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/yanshuf0/owlio-go/handlers"

	"github.com/NYTimes/gziphandler"
)

func getRouter() *mux.Router {
	mux := mux.NewRouter()
	// Create G-Zip asset handler:
	assetHandler := gziphandler.GzipHandler(http.StripPrefix("/static/", http.FileServer(http.Dir("./web/owlio-spa/build/static"))))
	// Interceipt service-worker request:
	serviceWorkerHandler := http.StripPrefix("/service-worker.js", http.FileServer(http.Dir("./web/owlio-spa/build")))
	// Start spa:
	mux.PathPrefix("/static/").Handler(assetHandler)
	mux.PathPrefix("/service-worker.js").Handler(serviceWorkerHandler)

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/owlio-spa/build/index.html")
	})
	// End spa.

	// api setup:
	api := mux.PathPrefix("/api").Subrouter()

	// auth handlers:
	api.HandleFunc("/signup", handlers.Signup)
	api.HandleFunc("/signin", handlers.Signin)

	return mux
}
