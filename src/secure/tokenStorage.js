import * as Keychain from 'react-native-keychain';

const SERVICE = 'access-token';

export async function saveAccessToken(token) {
  // username은 의미 없고 password에 토큰 저장
  await Keychain.setGenericPassword('access', token, { service: SERVICE });
}

export async function getAccessToken() {
  const creds = await Keychain.getGenericPassword({ service: SERVICE });
  return creds ? creds.password : null;
}

export async function clearAccessToken() {
  try { await Keychain.resetGenericPassword({ service: SERVICE }); } catch {}
}