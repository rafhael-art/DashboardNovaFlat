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
}