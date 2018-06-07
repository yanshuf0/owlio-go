package env

import "flag"

func Production() bool {
	prod := flag.Bool(
		"prod",
		false,
		`Determines whether the app is running in production mode.`)

	flag.Parse()

	return *prod
}
