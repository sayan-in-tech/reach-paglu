let keys = null;

// Generate cryptographic keys
async function generateKeys() {
  keys = await crypto.subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign', 'verify']
  );
  return keys;
}

// Sign a report
export async function signReport(report) {
  if (!keys) await generateKeys();

  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(report));

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: { name: 'SHA-256' } },
    keys.privateKey,
    data
  );

  return {
    ...report,
    signature: Array.from(new Uint8Array(signature)),
    publicKey: await crypto.subtle.exportKey('jwk', keys.publicKey)
  };
}

// Verify a report
export async function verifyReport(report) {
  try {
    const publicKey = await crypto.subtle.importKey(
      'jwk',
      report.publicKey,
      { name: 'ECDSA', namedCurve: 'P-256' },
      true,
      ['verify']
    );

    const signature = new Uint8Array(report.signature);
    const data = new TextEncoder().encode(JSON.stringify({
      target: report.target,
      reporter: report.reporter,
      timestamp: report.timestamp
    }));

    return await crypto.subtle.verify(
      { name: 'ECDSA', hash: { name: 'SHA-256' } },
      publicKey,
      signature,
      data
    );
  } catch (e) {
    return false;
  }
}