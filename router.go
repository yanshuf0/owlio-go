package main

import (
	"net/http"

	"github.com/gobuffalo/packr"

	"github.com/gorilla/mux"
	"github.com/yanshuf0/owlio-go/handlers"

	"github.com/NYTimes/gziphandler"
)

func getRouter() *mux.Router {
	rtr := mux.NewRouter()
	// Create packr box:
	box := packr.NewBox("./web/owlio-spa/build")
	// Create G-Zip asset handler:
	assetHandler := gziphandler.GzipHandler(http.StripPrefix("/", http.FileServer(box)))

	// api subrouter:
	api := rtr.PathPrefix("/api").Subrouter()

	// auth handlers:
	api.HandleFunc("/signup", handlers.Signup)
	api.HandleFunc("/signin", handlers.Signin)

	// Serve spa:
	rtr.PathPrefix("/").Handler(assetHandler)

	return rtr
}
