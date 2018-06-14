package main

import (
	"net/http"

	"github.com/gobuffalo/packr"

	"github.com/gorilla/mux"
	"github.com/yanshuf0/owlio-go/handlers"

	"github.com/NYTimes/gziphandler"
)

func getRouter() *mux.Router {
	mux := mux.NewRouter()
	// Create packr box:
	staticBox := packr.NewBox("./web/owlio-spa/build/static")
	rootBox := packr.NewBox("./web/owlio-spa/build")
	// Create G-Zip asset handler:
	assetHandler := gziphandler.GzipHandler(http.StripPrefix("/static/", http.FileServer(staticBox)))
	// Interceipt service-worker request:
	serviceWorkerHandler := http.StripPrefix("/service-worker.js", http.FileServer(rootBox))
	// Start spa:
	mux.PathPrefix("/static/").Handler(assetHandler)
	mux.PathPrefix("/service-worker.js").Handler(serviceWorkerHandler)

	mux.Handle("/", http.FileServer(rootBox))
	// End spa.

	// api setup:
	api := mux.PathPrefix("/api").Subrouter()

	// auth handlers:
	api.HandleFunc("/signup", handlers.Signup)
	api.HandleFunc("/signin", handlers.Signin)

	return mux
}
