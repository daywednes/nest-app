import request from '@/utils/request'

export function getHubs(orgId) {
    return request({
        url: '/hub/' + orgId,
        method: 'get'
    })
}
export function getHubDetails(orgId) {
    return request({
        url: '/hub/details/' + orgId,
        method: 'get'
    })
}

export function createHub(data) {
    return request({
        url: '/hub',
        method: 'post',
        data
    })
}

export function deleteHub(id) {
    return request({
        url: '/hub/' + id,
        method: 'delete',
    })
}

export function updateHub(data) {
    return request({
        url: '/hub/' + data.id,
        method: 'patch',
        data
    })
}