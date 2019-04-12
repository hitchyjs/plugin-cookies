/**
 * (c) 2018 cepharum GmbH, Berlin, http://cepharum.de
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 cepharum GmbH
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @author: cepharum
 */

"use strict";

const Path = require( "path" );

const { describe, before, after, it } = require( "mocha" );
const HitchyDev = require( "hitchy-server-dev-tools" );

require( "should" );
require( "should-http" );


describe( "Hitchy w/ plugin for parsing cookies", () => {
	let server = null;

	before( "starting hitchy", () => {
		return HitchyDev.start( {
			extensionFolder: Path.resolve( __dirname, "../.." ),
			testProjectFolder: Path.resolve( __dirname, "../project" ),
		} )
			.then( s => {
				server = s;
			} );
	} );

	after( "stopping hitchy", () => {
		return server ? HitchyDev.stop( server ) : undefined;
	} );

	it( "is running", () => {
		return HitchyDev.query.get( "/" )
			.then( res => {
				res.should.have.status( 200 );
			} );
	} );

	it( "is returning detected set of provided cookies", () => {
		return HitchyDev.query.get( "/", null, {
			cookie: "scalar=1; list=first; list=second; counter=5",
		} )
			.then( res => {
				res.should.have.status( 200 );
				res.data.should.be.Object().which.has.property( "scalar" ).which.is.equal( "1" );
				res.data.should.be.Object().which.has.property( "list" ).which.is.an.Array().and.deepEqual( [ "first", "second" ] );
				res.data.should.be.Object().which.has.property( "counter" ).which.is.equal( "5" );
			} );
	} );

	it( "is returning detected set of provided cookies using URL different from parsing policy", () => {
		return HitchyDev.query.get( "/some/subordinated/url", null, {
			cookie: "scalar=3; list=a; list=2; counter=4",
		} )
			.then( res => {
				res.should.have.status( 200 );
				res.data.should.be.Object().which.has.property( "scalar" ).which.is.equal( "3" );
				res.data.should.be.Object().which.has.property( "list" ).which.is.an.Array().and.deepEqual( [ "a", "2" ] );
				res.data.should.be.Object().which.has.property( "counter" ).which.is.equal( "4" );
			} );
	} );

	it( "is returning detected set of provided cookies using URL different from parsing policy and different method", () => {
		return HitchyDev.query.post( "/some/subordinated/url", null, {
			cookie: "scalar=12; list=one; list=zwei; counter=1",
		} )
			.then( res => {
				res.should.have.status( 200 );
				res.data.should.be.Object().which.has.property( "scalar" ).which.is.equal( "12" );
				res.data.should.be.Object().which.has.property( "list" ).which.is.an.Array().and.deepEqual( [ "one", "zwei" ] );
				res.data.should.be.Object().which.has.property( "counter" ).which.is.equal( "1" );
			} );
	} );
} );
