package ces.sdk.sdk.db;

import java.io.*;

/**
 * 加密 解密类
 * @author Administrator
 *
 */
public class Base64
{

    public Base64()
    {
    }
    
    public static byte[] encode(byte data[])
    {
        int modulus = data.length % 3;
        byte bytes[];
        if(modulus == 0)
            bytes = new byte[(4 * data.length) / 3];
        else
            bytes = new byte[4 * (data.length / 3 + 1)];
        int dataLength = data.length - modulus;
        int i = 0;
        for(int j = 0; i < dataLength; j += 4)
        {
            int a1 = data[i] & 0xff;
            int a2 = data[i + 1] & 0xff;
            int a3 = data[i + 2] & 0xff;
            bytes[j] = encodingTable[a1 >>> 2 & 0x3f];
            bytes[j + 1] = encodingTable[(a1 << 4 | a2 >>> 4) & 0x3f];
            bytes[j + 2] = encodingTable[(a2 << 2 | a3 >>> 6) & 0x3f];
            bytes[j + 3] = encodingTable[a3 & 0x3f];
            i += 3;
        }

        switch(modulus)
        {
        case 1: // '\001'
        {
            int d1 = data[data.length - 1] & 0xff;
            int b1 = d1 >>> 2 & 0x3f;
            int b2 = d1 << 4 & 0x3f;
            bytes[bytes.length - 4] = encodingTable[b1];
            bytes[bytes.length - 3] = encodingTable[b2];
            bytes[bytes.length - 2] = 61;
            bytes[bytes.length - 1] = 61;
            break;
        }

        case 2: // '\002'
        {
            int d1 = data[data.length - 2] & 0xff;
            int d2 = data[data.length - 1] & 0xff;
            int b1 = d1 >>> 2 & 0x3f;
            int b2 = (d1 << 4 | d2 >>> 4) & 0x3f;
            int b3 = d2 << 2 & 0x3f;
            bytes[bytes.length - 4] = encodingTable[b1];
            bytes[bytes.length - 3] = encodingTable[b2];
            bytes[bytes.length - 2] = encodingTable[b3];
            bytes[bytes.length - 1] = 61;
            break;
        }
        }
        return bytes;
    }

    public static byte[] decode(byte data[])
    {
        byte bytes[];
        if(data[data.length - 2] == 61)
            bytes = new byte[(data.length / 4 - 1) * 3 + 1];
        else
        if(data[data.length - 1] == 61)
            bytes = new byte[(data.length / 4 - 1) * 3 + 2];
        else
            bytes = new byte[(data.length / 4) * 3];
        int i = 0;
        for(int j = 0; i < data.length - 4; j += 3)
        {
            byte b1 = decodingTable[data[i]];
            byte b2 = decodingTable[data[i + 1]];
            byte b3 = decodingTable[data[i + 2]];
            byte b4 = decodingTable[data[i + 3]];
            bytes[j] = (byte)(b1 << 2 | b2 >> 4);
            bytes[j + 1] = (byte)(b2 << 4 | b3 >> 2);
            bytes[j + 2] = (byte)(b3 << 6 | b4);
            i += 4;
        }

        if(data[data.length - 2] == 61)
        {
            byte b1 = decodingTable[data[data.length - 4]];
            byte b2 = decodingTable[data[data.length - 3]];
            bytes[bytes.length - 1] = (byte)(b1 << 2 | b2 >> 4);
        } else
        if(data[data.length - 1] == 61)
        {
            byte b1 = decodingTable[data[data.length - 4]];
            byte b2 = decodingTable[data[data.length - 3]];
            byte b3 = decodingTable[data[data.length - 2]];
            bytes[bytes.length - 2] = (byte)(b1 << 2 | b2 >> 4);
            bytes[bytes.length - 1] = (byte)(b2 << 4 | b3 >> 2);
        } else
        {
            byte b1 = decodingTable[data[data.length - 4]];
            byte b2 = decodingTable[data[data.length - 3]];
            byte b3 = decodingTable[data[data.length - 2]];
            byte b4 = decodingTable[data[data.length - 1]];
            bytes[bytes.length - 3] = (byte)(b1 << 2 | b2 >> 4);
            bytes[bytes.length - 2] = (byte)(b2 << 4 | b3 >> 2);
            bytes[bytes.length - 1] = (byte)(b3 << 6 | b4);
        }
        return bytes;
    }

    private static boolean ignore(char c)
    {
        return c == '\n' || c == '\r' || c == '\t' || c == ' ';
    }

    public static byte[] decode(String data)
    {
        ByteArrayOutputStream bOut = new ByteArrayOutputStream();
        try
        {
            decode(data, ((OutputStream) (bOut)));
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
        return bOut.toByteArray();
    }

    public static int decode(String data, OutputStream out)
        throws IOException
    {
        int length = 0;
        int end;
        for(end = data.length(); end > 0 && ignore(data.charAt(end - 1)); end--);
        for(int i = 0; i < end - 4;)
            if(ignore(data.charAt(i)))
            {
                i++;
            } else
            {
                byte b1 = decodingTable[data.charAt(i)];
                byte b2 = decodingTable[data.charAt(i + 1)];
                byte b3 = decodingTable[data.charAt(i + 2)];
                byte b4 = decodingTable[data.charAt(i + 3)];
                out.write(b1 << 2 | b2 >> 4);
                out.write(b2 << 4 | b3 >> 2);
                out.write(b3 << 6 | b4);
                length += 3;
                i += 4;
            }

        if(data.charAt(end - 2) == '=')
        {
            byte b1 = decodingTable[data.charAt(end - 4)];
            byte b2 = decodingTable[data.charAt(end - 3)];
            out.write(b1 << 2 | b2 >> 4);
            length++;
        } else
        if(data.charAt(end - 1) == '=')
        {
            byte b1 = decodingTable[data.charAt(end - 4)];
            byte b2 = decodingTable[data.charAt(end - 3)];
            byte b3 = decodingTable[data.charAt(end - 2)];
            out.write(b1 << 2 | b2 >> 4);
            out.write(b2 << 4 | b3 >> 2);
            length += 2;
        } else
        {
            byte b1 = decodingTable[data.charAt(end - 4)];
            byte b2 = decodingTable[data.charAt(end - 3)];
            byte b3 = decodingTable[data.charAt(end - 2)];
            byte b4 = decodingTable[data.charAt(end - 1)];
            out.write(b1 << 2 | b2 >> 4);
            out.write(b2 << 4 | b3 >> 2);
            out.write(b3 << 6 | b4);
            length += 3;
        }
        return length;
    }

    private static final byte encodingTable[] = {
        65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 
        75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 
        85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 
        101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 
        111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 
        121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 
        56, 57, 43, 47
    };
    private static final byte decodingTable[];

    static 
    {
        decodingTable = new byte[128];
        for(int i = 65; i <= 90; i++)
            decodingTable[i] = (byte)(i - 65);

        for(int i = 97; i <= 122; i++)
            decodingTable[i] = (byte)((i - 97) + 26);

        for(int i = 48; i <= 57; i++)
            decodingTable[i] = (byte)((i - 48) + 52);

        decodingTable[43] = 62;
        decodingTable[47] = 63;
    }
}
