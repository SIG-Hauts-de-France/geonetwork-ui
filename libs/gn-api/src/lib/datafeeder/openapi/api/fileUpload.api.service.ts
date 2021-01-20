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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
} from '@angular/common/http'
import { CustomHttpParameterCodec } from '../encoder'
import { Observable } from 'rxjs'

import { UploadJobStatusApiModel } from '../model/models'

import { BASE_PATH, COLLECTION_FORMATS } from '../variables'
import { Configuration } from '../configuration'

@Injectable({
  providedIn: 'root',
})
export class FileUploadApiService {
  protected basePath = 'https://localhost:8080'
  public defaultHeaders = new HttpHeaders()
  public configuration = new Configuration()
  public encoder: HttpParameterCodec

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath
      }
      this.configuration.basePath = basePath
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec()
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data'
    for (const consume of consumes) {
      if (form === consume) {
        return true
      }
    }
    return false
  }

  private addToHttpParams(
    httpParams: HttpParams,
    value: any,
    key?: string
  ): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value)
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key)
    }
    return httpParams
  }

  private addToHttpParamsRecursive(
    httpParams: HttpParams,
    value?: any,
    key?: string
  ): HttpParams {
    if (value == null) {
      return httpParams
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        ;(value as any[]).forEach(
          (elem) =>
            (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key))
        )
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(
            key,
            (value as Date).toISOString().substr(0, 10)
          )
        } else {
          throw Error('key may not be null if value is Date')
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k
            ))
        )
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value)
    } else {
      throw Error('key may not be null if value is not object or array')
    }
    return httpParams
  }

  /**
   * Start the analysis process for the uploaded file package
   * @param jobId Unique job identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public analyze(
    jobId: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any>
  public analyze(
    jobId: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpResponse<any>>
  public analyze(
    jobId: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpEvent<any>>
  public analyze(
    jobId: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any> {
    if (jobId === null || jobId === undefined) {
      throw new Error(
        'Required parameter jobId was null or undefined when calling analyze.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = []
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.post<any>(
      `${this.configuration.basePath}/upload/${encodeURIComponent(
        String(jobId)
      )}/analyze`,
      null,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Poll the status of all the upload jobs. Access restricted to administrators
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findAllUploadJobs(
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<Array<UploadJobStatusApiModel>>
  public findAllUploadJobs(
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<Array<UploadJobStatusApiModel>>>
  public findAllUploadJobs(
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<Array<UploadJobStatusApiModel>>>
  public findAllUploadJobs(
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.get<Array<UploadJobStatusApiModel>>(
      `${this.configuration.basePath}/upload/all`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Poll the status of a given upload job by id
   * @param jobId Unique job identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findUploadJob(
    jobId: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<UploadJobStatusApiModel>
  public findUploadJob(
    jobId: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<UploadJobStatusApiModel>>
  public findUploadJob(
    jobId: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<UploadJobStatusApiModel>>
  public findUploadJob(
    jobId: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (jobId === null || jobId === undefined) {
      throw new Error(
        'Required parameter jobId was null or undefined when calling findUploadJob.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.get<UploadJobStatusApiModel>(
      `${this.configuration.basePath}/upload/${encodeURIComponent(
        String(jobId)
      )}`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Poll the status of all the upload jobs owned by the calling user
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findUserUploadJobs(
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<Array<UploadJobStatusApiModel>>
  public findUserUploadJobs(
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<Array<UploadJobStatusApiModel>>>
  public findUserUploadJobs(
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<Array<UploadJobStatusApiModel>>>
  public findUserUploadJobs(
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.get<Array<UploadJobStatusApiModel>>(
      `${this.configuration.basePath}/upload`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Remove a job and all its resources (e.g. temporary files). Does not unpublish. Use abort&#x3D;true to abort a running analysis or publishing job
   * @param jobId Unique job identifier
   * @param abort If true, abort the dataset analysis or publishing, if running. Defaults to false
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public removeJob(
    jobId: string,
    abort?: boolean,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any>
  public removeJob(
    jobId: string,
    abort?: boolean,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpResponse<any>>
  public removeJob(
    jobId: string,
    abort?: boolean,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpEvent<any>>
  public removeJob(
    jobId: string,
    abort?: boolean,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any> {
    if (jobId === null || jobId === undefined) {
      throw new Error(
        'Required parameter jobId was null or undefined when calling removeJob.'
      )
    }

    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (abort !== undefined && abort !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>abort,
        'abort'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = []
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.delete<any>(
      `${this.configuration.basePath}/upload/${encodeURIComponent(
        String(jobId)
      )}`,
      {
        params: queryParameters,
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Upload one or multiple files to the server, and get a handle to the job. Once the files are uploaded, the analysis process should be triggered through \&quot;POST /upload/{jobId}/analyze\&quot;
   * @param filename
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public uploadFiles(
    filename?: Array<Blob>,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<UploadJobStatusApiModel>
  public uploadFiles(
    filename?: Array<Blob>,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<UploadJobStatusApiModel>>
  public uploadFiles(
    filename?: Array<Blob>,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<UploadJobStatusApiModel>>
  public uploadFiles(
    filename?: Array<Blob>,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['multipart/form-data']

    const canConsumeForm = this.canConsumeForm(consumes)

    let formParams: { append(param: string, value: any): any }
    let useForm = false
    let convertFormParamsToString = false
    // use FormData to transmit files using content-type "multipart/form-data"
    // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
    useForm = canConsumeForm
    if (useForm) {
      formParams = new FormData()
    } else {
      formParams = new HttpParams({ encoder: this.encoder })
    }

    if (filename) {
      if (useForm) {
        filename.forEach((element) => {
          formParams =
            (formParams.append('filename', <any>element) as any) || formParams
        })
      } else {
        formParams =
          (formParams.append(
            'filename',
            filename.join(COLLECTION_FORMATS['csv'])
          ) as any) || formParams
      }
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.post<UploadJobStatusApiModel>(
      `${this.configuration.basePath}/upload`,
      convertFormParamsToString ? formParams.toString() : formParams,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }
}
