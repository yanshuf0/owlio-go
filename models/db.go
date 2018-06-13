package models

import mgo "gopkg.in/mgo.v2"

// Db is the exported db to be used throughout the application
var Db *mgo.Database

func init() {
	session, e := mgo.Dial("127.0.0.1")
	Db = session.DB("fridgeit")
	if e != nil {
		panic(e)
	}
}
