import { UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export type CustomQueryOptions<T> = Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>
