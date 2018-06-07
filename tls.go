package main

import (
	"context"
	"crypto/tls"
	"fmt"

	"golang.org/x/crypto/acme/autocert"
)

var hostPolicy = func(ctx context.Context, host string) error {
	// Note: change to your real domain
	allowedHost := "locahost"
	if host == allowedHost {
		return nil
	}
	return fmt.Errorf("acme/autocert: only %s host is allowed", allowedHost)
}

var dataDir = "./env"

var m = &autocert.Manager{
	Prompt:     autocert.AcceptTOS,
	HostPolicy: hostPolicy,
	Cache:      autocert.DirCache(dataDir),
}

var tlsConfig = &tls.Config{
	PreferServerCipherSuites: true,
	CurvePreferences: []tls.CurveID{
		tls.CurveP256,
		tls.X25519,
	},
	MinVersion: tls.VersionTLS12,
	CipherSuites: []uint16{
		tls.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
		tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
		tls.TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,
		tls.TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,
		tls.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
		tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
	},
	GetCertificate: m.GetCertificate,
}
