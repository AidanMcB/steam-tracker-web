import type { ErrorResponse } from "../ts/api";
import type { AxiosError } from "axios";

export const handleApiError = (error: AxiosError): ErrorResponse => {
    const parsedError: ErrorResponse = {
        status: "error",
        code: error.response?.status || 500,
        message: error.message,
        info: error.response?.data || null,
    };
    throw parsedError;
}

export const arraysEqual = (a: string[], b: string[]): boolean => {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
};


export const normalizeToCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(item => normalizeToCamelCase(item));
    }
    
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    return Object.keys(obj).reduce((result, key) => {
        // Convert property name to camelCase
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
                           .replace(/^([A-Z])/, (_, letter) => letter.toLowerCase());
        
        // Special case conversions
        const finalKey = 
            key === 'steamid' ? 'steamId' :
            key === 'personaname' ? 'personaName' : 
            key === 'avatarfull' ? 'avatarFull' :
            key === 'avatarhash' ? 'avatarHash' :
            key === 'avatarmedium' ? 'avatarMedium' :
            key === 'communityvisibilitystate' ? 'communityVisibilityState' :
            key === 'lastlogoff' ? 'lastLogoff' :
            key === 'personastate' ? 'personaState' :
            key === 'personastateflags' ? 'personaStateFlags' :
            key === 'primaryclanid' ? 'primaryClanId' :
            key === 'profilestate' ? 'profileState' :
            key === 'profileurl' ? 'profileUrl' :
            key === 'realname' ? 'realName' :
            key === 'timecreated' ? 'timeCreated' :
            camelKey;
            
        result[finalKey] = normalizeToCamelCase(obj[key]);
        return result;
    }, {} as Record<string, any>);
}
