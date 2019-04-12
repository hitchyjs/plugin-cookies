/**
 * (c) 2019 cepharum GmbH, Berlin, http://cepharum.de
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 cepharum GmbH
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

exports.parse = function( req, res, next ) {
	const log = this.api.log( "hitchy:cookies" );

	const { cookie } = req.headers;
	const parsed = {};
	const pattern = /([^=]+)=([^;]*)(?:;|$)/g;

	if ( typeof cookie === "string" ) {
		let match;

		while ( ( match = pattern.exec( cookie ) ) ) {
			const name = match[1].trim();
			const value = match[2];

			log( `DEBUG: collecting cookie named ${name} with value "${value}"` );

			if ( parsed.hasOwnProperty( name ) ) {
				if ( Array.isArray( parsed[name] ) ) {
					parsed[name].push( value );
				} else {
					parsed[name] = [ parsed[name], value ];
				}
			} else {
				parsed[name] = value;
			}
		}
	}

	req.cookies = parsed;

	next();
};
