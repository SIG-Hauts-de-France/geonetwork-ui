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
export interface UserSecurityApiModel {
  nodeId?: string
  authType?: string
  securityNotifications?: Set<UserSecurityApiModel.SecurityNotificationsEnum>
  securityNotificationsString?: UserSecurityApiModel
}
export namespace UserSecurityApiModel {
  export type SecurityNotificationsEnum = 'UPDATE_HASH_REQUIRED' | 'UNKNOWN'
  export const SecurityNotificationsEnum = {
    UPDATEHASHREQUIRED: 'UPDATE_HASH_REQUIRED' as SecurityNotificationsEnum,
    UNKNOWN: 'UNKNOWN' as SecurityNotificationsEnum,
  }
}