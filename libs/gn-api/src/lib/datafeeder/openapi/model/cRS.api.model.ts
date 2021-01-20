/**
 * DataFeeder API
 * This API covers dataset upload and publishing features of the application
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: psc@georchestra.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Coordinate Reference System
 */
export interface CRSApiModel {
  /**
   * Coordinate Reference System\'s EPSG identifier. Can be null if a matching reference system couldn\'t be found in the EPSG database.
   */
  srs?: string
  /**
   * Coordinate Reference System\'s Well Known Text representation. Despite the \'srs\' identifier being found or not, the WKT representation is still available.
   */
  WKT?: string
}
