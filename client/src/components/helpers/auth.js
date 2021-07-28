// import { useState } from 'react'
// import axios from 'axios'

// gets the token from local storage
export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

// gets the payload
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return false 
  const parts = token.split('.')
  if (parts.length < 3) return false 
  return JSON.parse(atob(parts[1]))
}

// check whether user is authenticated
export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

// get userId
export const getUserId = () => {
  const payload = getPayload()
  if (!payload) return 
  return payload.sub
}

// sets token to local storage 
export const setTokenToLocalStorage = (token) => {
  window.localStorage.setItem('token', token)
}