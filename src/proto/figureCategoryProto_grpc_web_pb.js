/**
 * @fileoverview gRPC-Web generated client stub for figureCategoryProto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.figureCategoryProto = require('./figureCategoryProto_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.figureCategoryProto.FigureCategoryServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.figureCategoryProto.FigureCategoryServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.figureCategoryProto.FigureCategoryRequest,
 *   !proto.figureCategoryProto.FigureCategoryReply>}
 */
const methodDescriptor_FigureCategoryService_GetFigureCategories = new grpc.web.MethodDescriptor(
  '/figureCategoryProto.FigureCategoryService/GetFigureCategories',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.figureCategoryProto.FigureCategoryRequest,
  proto.figureCategoryProto.FigureCategoryReply,
  /**
   * @param {!proto.figureCategoryProto.FigureCategoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.figureCategoryProto.FigureCategoryReply.deserializeBinary
);


/**
 * @param {!proto.figureCategoryProto.FigureCategoryRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.figureCategoryProto.FigureCategoryReply>}
 *     The XHR Node Readable Stream
 */
proto.figureCategoryProto.FigureCategoryServiceClient.prototype.getFigureCategories =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/figureCategoryProto.FigureCategoryService/GetFigureCategories',
      request,
      metadata || {},
      methodDescriptor_FigureCategoryService_GetFigureCategories);
};


/**
 * @param {!proto.figureCategoryProto.FigureCategoryRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.figureCategoryProto.FigureCategoryReply>}
 *     The XHR Node Readable Stream
 */
proto.figureCategoryProto.FigureCategoryServicePromiseClient.prototype.getFigureCategories =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/figureCategoryProto.FigureCategoryService/GetFigureCategories',
      request,
      metadata || {},
      methodDescriptor_FigureCategoryService_GetFigureCategories);
};


module.exports = proto.figureCategoryProto;

