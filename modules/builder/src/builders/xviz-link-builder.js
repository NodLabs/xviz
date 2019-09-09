// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable camelcase */
import XVIZBaseBuilder from './xviz-base-builder';

export default class XVIZLinkBuilder extends XVIZBaseBuilder {
  constructor(props) {
    super({...props});

    this._links = null;
    this._sourceStream = null;
  }

  source(sourceStream) {
    this._sourceStream = sourceStream;
  }

  _flush() {
    if (!this._links) {
      this._links = {};
    }

    const data = {};

    if (this._sourceStream) {
      data.source_pose = this._sourceStream;
      this._links[this._streamId] = data;
    }
  }

  reset() {
    super.reset();

    this._sourceStream = null;
  }

  getData() {
    if (this._streamId) {
      this._flush();
    }

    return this._links;
  }
}
