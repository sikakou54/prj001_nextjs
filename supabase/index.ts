import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const service_role = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE

export const supabase = createClient(supabaseUrl as string, supabaseKey as string, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
})

export const supabaseAdmin = createClient(supabaseUrl as string, service_role as string, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
})

export async function SupaBaseRpcApi(name: string, params?: any): Promise<{ data: any[], count: number | null, error: any, status: any }> {
    return new Promise(async (resolve, reject) => {
        try {
            const { data, error, status, count } = await supabase.rpc(name, params)
            if (error) {
                throw { error, status };
            }
            resolve({
                data,
                count,
                error,
                status
            })
        } catch ({ error, status }: any) {
            console.log('SupaBaseRpcApi', error, status)
        }
    })
}

export async function SupaBaseRpcSingleApi(name: string, params?: any): Promise<{ data: any, count: number | null, error: any, status: any }> {
    return new Promise(async (resolve, reject) => {
        try {
            const { data, error, status, count } = await supabase.rpc(name, params).maybeSingle()
            if (error) {
                throw { error, status };
            }
            resolve({
                data,
                count,
                error,
                status
            })
        } catch ({ error, status }: any) {
            console.log('SupaBaseRpcSingleApi', error, status)
        }
    })
}