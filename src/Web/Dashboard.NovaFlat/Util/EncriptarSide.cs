using System;
using System.Security.Cryptography;
using System.Text;

namespace Dashboard.NovaFlat.Util;

public class EncriptarSide
{
    public static string Encriptar(string passKey, string passBase, string saltValue, string hashAlgorithm, int passwordIterations, string initVector, int keySize)
    {
        byte[] initVectorBytes = Encoding.ASCII.GetBytes(initVector);
        byte[] saltValueBytes = Encoding.ASCII.GetBytes(saltValue);
        byte[] plainTextBytes = Encoding.UTF8.GetBytes(passKey);
        PasswordDeriveBytes password = new PasswordDeriveBytes(passBase,
        saltValueBytes, hashAlgorithm, passwordIterations);
        byte[] keyBytes = password.GetBytes(keySize / 8);
        using (Aes symmetricKey = Aes.Create())
        {
            symmetricKey.Mode = CipherMode.CBC;
            symmetricKey.Key = keyBytes;
            symmetricKey.IV = initVectorBytes;
            using (ICryptoTransform encryptor = symmetricKey.CreateEncryptor(keyBytes, initVectorBytes))
            using (MemoryStream memoryStream = new MemoryStream())
            {
                using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                {
                    cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                    cryptoStream.FlushFinalBlock();
                }
                byte[] cipherTextBytes = memoryStream.ToArray();
                return Convert.ToBase64String(cipherTextBytes);
            }
        }
    }

    public static string CaseSwitchIn(string crtr)
    {
        switch (crtr)
        {
            case "1":
                crtr = "0";
                break;
            case "2":
                crtr = "1";
                break;
            case "3":
                crtr = "2";
                break;
            case "4":
                crtr = "3";
                break;
            case "5":
                crtr = "4";
                break;
            case "6":
                crtr = "5";
                break;
            case "7":
                crtr = "6";
                break;
            case "8":
                crtr = "7";
                break;
            case "9":
                crtr = "8";
                break;
            case "0":
                crtr = "9";
                break;
        }

        return crtr;
    }

    public static string codec(string pswd)
    {
        string key = "";
        string ProcessedKey = "";
        for (int i = 0; i < pswd.Length; i++)
        {
            key = key + CaseSwitchIn(pswd.Substring(i, 1));
        }

        ProcessedKey = Encriptar(key, "pass3Dg@r1986", "3Dg@rClNto", "MD5", 2, "@1A2b3C4d5E6f7G8", 128);
        return ProcessedKey;
    }

    public static string decod(string pswd)
    {
        string key = "";
        string ProcessedKey = "";
        ProcessedKey = Desencriptar(pswd, "pass3Dg@r1986", "3Dg@rClNto", "MD5", 1, "@1A2b3C4d5E6f7G8", 128); ;
        for (int i = 0; i < ProcessedKey.Length; i++)
        {
            key = key + CaseSwitchOut(ProcessedKey.Substring(i, 1));
        }

        return key;
    }

    public static string Desencriptar(string passKey, string passBase, string saltValue, string hashAlgorithm, int passwordIterations, string initVector, int keySize)
    {
        byte[] initVectorBytes = Encoding.ASCII.GetBytes(initVector);
        byte[] saltValueBytes = Encoding.ASCII.GetBytes(saltValue);
        byte[] cipherTextBytes = Convert.FromBase64String(passKey);
        PasswordDeriveBytes password = new PasswordDeriveBytes(passBase, saltValueBytes, hashAlgorithm, passwordIterations);
        byte[] keyBytes = password.GetBytes(keySize / 8);

        using Aes symmetricKey = Aes.Create();
        symmetricKey.Mode = CipherMode.CBC;
        symmetricKey.Key = keyBytes;
        symmetricKey.IV = initVectorBytes;

        ICryptoTransform decryptor = symmetricKey.CreateDecryptor(symmetricKey.Key, symmetricKey.IV);
        using MemoryStream memoryStream = new MemoryStream(cipherTextBytes);
        using CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);

        byte[] plainTextBytes = new byte[cipherTextBytes.Length];
        int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);

        string plainText = Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
        return plainText;
    }


    public static string CaseSwitchOut(string crtr)
    {
        switch (crtr)
        {
            case "0":
                crtr = "1";
                break;
            case "1":
                crtr = "2";
                break;
            case "2":
                crtr = "3";
                break;
            case "3":
                crtr = "4";
                break;
            case "4":
                crtr = "5";
                break;
            case "5":
                crtr = "6";
                break;
            case "6":
                crtr = "7";
                break;
            case "7":
                crtr = "8";
                break;
            case "8":
                crtr = "9";
                break;
            case "9":
                crtr = "0";
                break;
        }
        return crtr;
    }
}