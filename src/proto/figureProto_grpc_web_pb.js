/**
 * @fileoverview gRPC-Web generated client stub for figureProto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.figureProto = require('./figureProto_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.figureProto.FigureServiceClient =
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
proto.figureProto.FigureServicePromiseClient =
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
 *   !proto.figureProto.SendRequest,
 *   !proto.figureProto.SendReply>}
 */
const methodDescriptor_FigureService_GetFigures = new grpc.web.MethodDescriptor(
  '/figureProto.FigureService/GetFigures',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.figureProto.SendRequest,
  proto.figureProto.SendReply,
  /**
   * @param {!proto.figureProto.SendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.figureProto.SendReply.deserializeBinary
);


/**
 * @param {!proto.figureProto.SendRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.figureProto.SendReply>}
 *     The XHR Node Readable Stream
 */
proto.figureProto.FigureServiceClient.prototype.getFigures =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/figureProto.FigureService/GetFigures',
      request,
      metadata || {},
      methodDescriptor_FigureService_GetFigures);
};


/**
 * @param {!proto.figureProto.SendRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.figureProto.SendReply>}
 *     The XHR Node Readable Stream
 */
proto.figureProto.FigureServicePromiseClient.prototype.getFigures =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/figureProto.FigureService/GetFigures',
      request,
      metadata || {},
      methodDescriptor_FigureService_GetFigures);
};


module.exports = proto.figureProto;

