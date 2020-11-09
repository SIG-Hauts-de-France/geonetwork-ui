/**
 * GeoNetwork 4.0.0 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.0.0
 * Contact: geonetwork-users@lists.sourceforge.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

export interface MetadataResourceApiModel {
  url?: string
  filename?: string
  visibility?: MetadataResourceApiModel.VisibilityEnum
  lastModification?: string
  id?: string
  size?: number
}
export namespace MetadataResourceApiModel {
  export type VisibilityEnum = 'public' | 'private'
  export const VisibilityEnum = {
    Public: 'public' as VisibilityEnum,
    Private: 'private' as VisibilityEnum,
  }
}