---
sidebar_position: 4
---

# Decrypting

In order to decrypt the string, pass in the streamID saved from the earlier encrypting step.

```
    const response = litCeramicIntegration.readAndDecrypt(streamID).then(
      (value) =>
        console.log(value)
    )
```

In the example code, the decryption element is update and displays the decrypted message. 

```
  (document.getElementById('decryption').innerText = value)
```
