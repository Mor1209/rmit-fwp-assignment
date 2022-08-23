import React, { useState, useEffect, useMemo } from 'react'
import BasicForm from './BasicForm'

import * as qrcode from 'qrcode'
import { useRegister } from '../../hooks/useRegister'
import { useMfaValidation } from '../../hooks/useUserValidation'
const speakeasy = require('speakeasy')

const MfaForm = props => {
  // const registerDetails = useMemo(
  //   () => props.registerDetails,
  //   [props.registerDetails]
  // )
  const { register } = useRegister()
  const inputFields = [{ label: 'token', defaultValue: '' }]
  const [qr, setQr] = useState('')
  const [secret, setSecret] = useState({})

  useEffect(() => {
    const getQr = async () => {
      try {
        const newSecret = speakeasy.generateSecret({ name: 'LoopAgileNow' })
        setSecret(newSecret)
        const qrDataURL = await qrcode.toDataURL(newSecret.otpauth_url)
        console.log(qrDataURL)
        setQr(qrDataURL)
      } catch (err) {
        console.error(err)
      }
    }

    if (props.registerDetails.name) {
      getQr()
    }
  }, [props.registerDetails.name])

  const onSubmit = data => {
    console.log('validation in MFA')
    console.log(typeof data.token)
    const verified = speakeasy.totp.verify({
      secret: secret.ascii,
      encoding: 'ascii',
      token: data.token,
    })
    console.log('verfied:')
    console.log(verified)
    if (!verified) return

    console.log('registerdetails name')
    console.log(props.registerDetails.name)

    register(
      props.registerDetails.name,
      props.registerDetails.email,
      props.registerDetails.password,
      secret
    )
  }

  const mfaValidation = useMfaValidation(onSubmit)

  return (
    <BasicForm
      validation={mfaValidation}
      inputFieldLabels={inputFields}
      formName={props.formName}
    >
      {qr && <img src={qr} alt="QR Code for authenticator app" />}
    </BasicForm>
  )
}

export default MfaForm
