import sjcl from "sjcl";

export const getHash = str => {
  const hashArray = sjcl.hash.sha256.hash(str);
  const hash = sjcl.codec.hex.fromBits(hashArray);
  return hash;
};
