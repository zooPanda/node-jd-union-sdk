import { URL } from "url";
import crypto from "crypto"
import axios from "axios";
import format from "date-fns/format";

export default class jdUnion {
    method: string
    constructor(public appkey: string, public secret: string) {
        this.appkey = appkey
        this.secret = secret
    }

    /**
     * 网站/APP来获取的推广链接
     * @param materialId 推广物料url，例如活动链接、商品链接等；不支持仅传入skuid
     * @param siteId 网站ID/APP ID
     * @param positionId 推广位id
     * @param subUnionId 子渠道标识
     * @param ext1 系统扩展参数
     * @param pid 联盟子推客身份标识
     * @param couponUrl 优惠券领取链接
     * @param giftCouponKey 礼金批次号
     * @param channelId 渠道关系ID
     * @returns 
     */
    public async promotion_common_get(materialId: string, siteId: number, params?: { positionId?: number, subUnionId?: string, ext1?: string, pid?: string, couponUrl?: string, giftCouponKey?: string, channelId?: number }) {
        this.method = "jd.union.open.promotion.common.get"
        return await this.sendRequest({
            promotionCodeReq: {
                materialId,
                siteId,
                ...params
            }
        })
    }

    /**
     * 社交媒体获取推广链接
     * @param materialId 推广物料url，例如活动链接、商品链接等；不支持仅传入skuid
     * @param params 选填参数 参考官方API文档
     * @returns 
     */
    public async promotion_bysubunionid_get(materialId: string, params?: { subUnionId?: string, positionId?: number, pid?: string, couponUrl?: string, chainType?: number, giftCouponKey?: string, channelId?: number }) {
        this.method = 'jd.union.open.promotion.bysubunionid.get'
        return await this.sendRequest({
            promotionCodeReq: {
                materialId,
                ...params
            }
        })
    }

    /**
     * 工具上获取推广链接
     * @param materialId 推广物料url，例如活动链接、商品链接等；不支持仅传入skuid
     * @param unionId 目标推客的联盟ID
     * @param params 选填参数 参考官方API文档
     * @returns 
     */
    public async promotion_byunionid_get(materialId: string, unionId: number, params?: { subUnionId?: string, positionId?: number, pid?: string, couponUrl?: string, chainType?: number, giftCouponKey?: string, channelId?: number }) {
        this.method = 'jd.union.open.promotion.byunionid.get'
        return await this.sendRequest({
            promotionCodeReq: {
                materialId,
                unionId,
                ...params
            }
        })
    }

    /**
     * 通过频道ID查询各个频道下的精选商品
     * @param eliteId 频道ID
     * @param params 选填参数 参考官方API文档
     */
    public async goods_jingfen_query(eliteId: number, params?: { pageIndex?: number, pageSize?: number, sortName?: string, sort?: string, pid?: string, fields?: string, forbidTypes?: string, groupId?: number, ownerUnionId?: number }) {
        this.method = 'jd.union.open.goods.jingfen.query'
        return await this.sendRequest({
            goodsReq: {
                eliteId,
                ...params
            }
        })
    }

    /**
     * 查询商品及优惠券信息
     * @param goodsReqDTO 选填参数 参考官方API文档
     * @returns 
     */
    public async goods_query(goodsReqDTO: IgoodsReqDTO) {
        this.method = 'jd.union.open.goods.query'
        return await this.sendRequest({
            goodsReqDTO
        })
    }

    /**
     * 猜你喜欢商品推荐
     * @param eliteId 频道ID
     * @param params 选填参数 参考官方API文档
     * @returns 
     */
    public async goods_material_query(eliteId: number, params?: { pageIndex?: number, pageSize?: number, sortName?: string, sort?: string, pid?: string, subUnionId?: string, siteId?: string, positionId?: string, ext1?: string, skuId?: number, hasCoupon?: number, userIdType?: number, userId?: string, fields?: string, forbidTypes?: string, groupId?: number, ownerUnionId?: number, benefitType?: number }) {
        this.method = 'jd.union.open.goods.material.query'
        return await this.sendRequest({
            goodsReq: {
                eliteId,
                ...params
            }
        })
    }

    /**
     * 通过SKUID查询推广商品
     * @param skus 京东skuID串，逗号分割
     * @returns 
     */
    public async goods_promotiongoodsinfo_query(...skus: number[]) {
        this.method = 'jd.union.open.goods.promotiongoodsinfo.query'
        return await this.sendRequest({
            skuIds: skus.join(",")
        })
    }

    /**
     * 根据商品的父类目id查询子类目id信息
     * @param parentId 父类目id
     * @param grade 类目级别
     * @returns 
     */
    public async category_goods_get(parentId: number, grade: number) {
        this.method = 'jd.union.open.category.goods.get'
        return await this.sendRequest({
            req: {
                parentId,
                grade
            }
        })
    }

    /**
     * 商品详情查询接口
     * @param skuIds skuId集合，最多支持批量入参10个sku
     * @param fields 查询域集合
     * @returns 
     */
    public async goods_bigfield_query(skuIds: number[], fields?: string[]) {
        this.method = 'jd.union.open.goods.bigfield.query'
        return await this.sendRequest({
            goodsReq: {
                skuIds,
                fields
            }
        })
    }

    /**
     * 查询优惠券的平台、面额、期限、可用状态、剩余数量
     * @param couponUrls 优惠券链接集合
     * @returns 
     */
    public async coupon_query(...couponUrls: string[]) {
        this.method = 'jd.union.open.coupon.query'
        return await this.sendRequest({
            couponUrls
        })
    }

    /**
     * 盟官方活动查询
     * @param activityReqDTO 选填参数 参考官方API文档
     * @returns 
     */
    public async activity_query(activityReqDTO?: { pageIndex?: number, pageSize?: number, poolId?: number, activeDate?: string }) {
        this.method = 'jd.union.open.activity.query'
        return await this.sendRequest({
            activityReq: {
                ...activityReqDTO
            }
        })
    }

    /**
     * 个性化推荐的活动
     * @param activityRecommendDTO 选填参数 参考官方API文档
     * @returns 
     */
    public async activity_recommend_query(activityRecommendDTO?: { userId?: string, userIdType?: number, orderId?: number, pid?: string, subUnionId?: string, siteId?: string, positionId?: number, needClickUrl?: number, imageWidth?: number, imageHeight?: number }) {
        this.method = 'jd.union.open.activity.recommend.query'
        return await this.sendRequest({
            req: {
                ...activityRecommendDTO
            }
        })
    }

    /**
     * 活动爆料信息
     * @param intelligenceQueryDTO 选填参数 参考官方API文档
     * @returns 
     */
    public async promotion_intelligence_query(intelligenceQueryDTO?: { title?: string, type?: number, cid1List?: number[], status?: number, essence?: string, pageIndex?: number, pageSize?: number, pid?: string, subUnionId?: string, siteId?: number, positionId?: number, ext1?: string }) {
        this.method = 'jd.union.open.promotion.intelligence.query'
        return await this.sendRequest({
            req: {
                ...intelligenceQueryDTO
            }
        })
    }

    /**
     * 工具商 活动爆料信息
     * @param intelligenceQueryDTO 选填参数 参考官方API文档
     * @returns 
     */
    public async promotion_tools_intelligence_query(intelligenceQueryDTO?: { title?: string, type?: number, cid1List?: number[], status?: number, essence?: string, pageIndex?: number, pageSize?: number, pid?: string, subUnionId?: string, siteId?: number, positionId?: number, unionId: number }) {
        this.method = 'jd.union.open.promotion.tools.intelligence.query'
        return await this.sendRequest({
            req: {
                ...intelligenceQueryDTO
            }
        })
    }

    /**
     * 查询推广订单及佣金信息
     * @param pageIndex 页数
     * @param type 订单时间查询类型(1：下单时间，2：完成时间（购买用户确认收货时间），3：更新时间
     * @param startTime 开始时间 格式yyyy-MM-dd HH:mm:ss，与endTime间隔不超过1小时
     * @param endTime 结束时间 格式yyyy-MM-dd HH:mm:ss，与startTime间隔不超过1小时
     * @param params 选填参数 参考官方API文档
     * @returns 
     */
    public async order_row_query(pageIndex: number, type: number, startTime: string, endTime: string, params: { childUnionId?: number, key?: string, fields?: string, pageSize?: number, }) {
        this.method = 'jd.union.open.order.row.query'
        return await this.sendRequest({
            orderReq: {
                pageIndex,
                type,
                startTime,
                endTime,
                ...params
            }
        })
    }

    /**
     * 奖励订单查询接口
     * @param optType 时间类型（1.下单时间拉取、2.更新时间拉取）
     * @param startTime 订单开始时间，时间戳（毫秒），与endTime间隔不超过10分钟
     * @param endTime 订单结束时间，时间戳（毫秒），与startTime间隔不超过10分钟
     * @param pageNo 页码，默认值为1
     * @param pageSize 每页数量，上限100
     * @param sortValue 与pageNo、pageSize组合使用。获取当前页最后一条记录的sortValue，下一页请求传入该值
     * @param activityId 奖励活动ID
     * @returns 
     */
    public async order_bonus_query(optType: number, startTime: number, endTime: number, pageNo: number, pageSize: number, sortValue: string, activityId?: number) {
        this.method = 'jd.union.open.order.bonus.query'
        return await this.sendRequest({
            orderReq: {
                optType,
                startTime,
                endTime,
                pageNo,
                pageSize,
                sortValue,
                activityId
            }
        })
    }

    /**
     * 查询京享红包活动
     * @param startDate 开始日期yyyy-MM-dd，不可超出最近90天
     * @param endDate 结束时间yyyy-MM-dd，不可超出最近90天
     * @param pageIndex 页码，起始1
     * @param pageSize 每页数，大于等于10且小于等于100的正整数
     * @param params 选填参数 参考官方API文档
     * @returns 
     */
    public async statistics_redpacket_query(startDate: string, endDate: string, pageIndex: number, pageSize: number, params?: { actId?: number, positionId?: number, key?: string, type?: number, channelIds?: number[] }) {
        this.method = 'jd.union.open.statistics.redpacket.query'
        return await this.sendRequest({
            effectDataReq: {
                startDate,
                endDate,
                pageIndex,
                pageSize,
                ...params
            }
        })
    }

    /**
     * 直接查询您的工具替其他推客推广引入的订单
     * @param pageIndex 页码
     * @param pageSize 每页包含条数，上限为500
     * @param type 订单时间查询类型(1：下单时间，2：完成时间，3：更新时间)
     * @param startTime 开始时间 格式yyyy-MM-dd HH:mm:ss，与endTime间隔不超过20分钟
     * @param endTime 结束时间 格式yyyy-MM-dd HH:mm:ss，与startTime间隔不超过20分钟
     * @param fields 筛选出参，多项逗号分隔，目前支持：categoryInfo、goodsInfo
     * @returns 
     */
    public async order_agent_query(pageIndex: number, pageSize: number, type: number, startTime: string, endTime: string, fields?: string) {
        this.method = 'jd.union.open.order.agent.query'
        return await this.sendRequest({
            orderReq: {
                pageIndex,
                pageSize,
                type,
                startTime,
                endTime,
                fields
            }
        })
    }

    /**
     * 工具商查询帮助其他推客转的链接的红包发放数据
     * @param startDate 开始日期yyyy-MM-dd，不可超出最近90天
     * @param endDate 结束时间yyyy-MM-dd，不可超出最近90天
     * @param pageIndex 页码，起始1
     * @param pageSize 每页数，大于等于10且小于等于100的正整数
     * @param params 选填参数 参考官方API文档
     * @returns 
     */
    public async statistics_redpacket_agent_query(startDate: string, endDate: string, pageIndex: number, pageSize: number, params?: { type?: number, actId: number }) {
        this.method = 'jd.union.open.statistics.redpacket.agent.query'
        return await this.sendRequest({
            effectDataAgentReq: {
                startDate,
                endDate,
                pageIndex,
                pageSize,
                ...params
            }
        })
    }

    /**
     * 查询近3个月的奖励活动信息
     * @param beginTime 奖励活动开始时间,开始时间为最近90天，时间戳（ms）
     * @param endTime 奖励活动结束时间，时间戳（ms）
     * @param pageIndex 索引
     * @param pageSize 每页数量
     * @param activityId 奖励活动Id
     * @returns 
     */
    public async activity_bonus_query(beginTime: number, endTime: number, pageIndex: number, pageSize: number, activityId?: number) {
        this.method = 'jd.union.open.activity.bonus.query'
        return await this.sendRequest({
            req: {
                beginTime,
                endTime,
                pageIndex,
                pageSize,
                activityId
            }
        })
    }

    /**
     * 查询近12个月的奖励金额
     * @param activityId 奖励活动Id
     * @returns 
     */
    public async statistics_activity_bonus_query(activityId: number) {
        this.method = 'jd.union.open.statistics.activity.bonus.query'
        return await this.sendRequest({
            req: {
                activityId
            }
        })
    }

    /**
     * 礼金创建接口
     * @param skuMaterialId 商品skuId或落地页地址
     * @param discount 优惠券面额，最小不可低于1元，最大不可超过pop商品价格的80%，自营商品价格的50%。如：1或者1.00或者1.01
     * @param amount 总数量
     * @param receiveStartTime 领取开始时间(yyyy-MM-dd HH)，区间为(创建当天0点直至未来6天内)，系统补充为yyyy-MM-dd HH:00:00
     * @param receiveEndTime 领取结束时间(yyyy-MM-dd HH)，区间为(创建当前时间点直至未来6天内)，系统补充为yyyy-MM-dd HH:59:59
     * @param isSpu 是否绑定同spu商品(1:是;0:否)，例如skuMaterialId输入一款37码的鞋，当isSpu选择1时，此款鞋的全部尺码均可推广这张礼金；当isSpu选择0时，此款鞋仅37码可推广这张礼金，其他鞋码不支持
     * @param expireType 使用时间类型：1.相对时间，需配合effectiveDays一同传入；2.绝对时间，需配合useStartTime和useEndTime一同传入
     * @param share 每个礼金推广链接是否限制仅可领取1张礼金：-1不限，1限制
     * @param params 选填参数 参考官方API文档
     * @returns 
     */
    public async coupon_gift_get(skuMaterialId: string, discount: number, amount: number, receiveStartTime: string, receiveEndTime: string, isSpu: number, expireType: number, share: number, params?: { effectiveDays?: number, useStartTime?: string, useEndTime?: string, contentMatch?: number, couponTitle?: string, contentMatchMedias?: number[], showInMedias?: number, targetType?: number, childPromoters?: string }) {
        this.method = 'jd.union.open.coupon.gift.get'
        return await this.sendRequest({
            couponReq: {
                skuMaterialId,
                discount,
                amount,
                receiveEndTime,
                receiveStartTime,
                isSpu,
                expireType,
                share,
                ...params
            }
        })
    }
    /**
     * 停止礼金
     * @param giftCouponKey 礼金批次ID
     * @returns 
     */
    public async coupon_gift_stop(giftCouponKey: string) {
        this.method = 'jd.union.open.coupon.gift.stop'
        return await this.sendRequest({
            couponReq: {
                giftCouponKey
            }
        })
    }
    /**
     * 礼金的实时推广数据
     * @param skuId 查询该SKU您创建的推客礼金，以及该SKU您可推广的联盟礼金。 skuId和giftCouponKey二选一，不可同时入参。
     * @param giftCouponKey 根据礼金批次ID精确查询礼金信息，请勿和createTime同时传入。 skuId和giftCouponKey二选一，不可同时入参。
     * @param params 选填参数 参考官方API文档
     * @returns 
     */
    public async statistics_giftcoupon_query(skuId: number, giftCouponKey: string, params?: { createTime?: string, startTime?: string, key?: string, targetType?: number }) {
        this.method = 'jd.union.open.statistics.giftcoupon.query'
        return await this.sendRequest({
            effectDataReq: {
                skuId,
                giftCouponKey,
                ...params
            }
        })
    }

    /**
     * 判定用户是否为京东注册用户
     * @param userId userIdType对应的用户设备ID，userIdType和userId需同时传入
     * @param userIdType 8(安卓移动设备Imei); 16(苹果移动设备Openudid)；32(苹果移动设备idfa); 64(安卓移动设备imei的md5编码，32位，大写，匹配率略低);128(苹果移动设备idfa的md5编码，32位，大写，匹配率略低); 32768(安卓移动设备oaid)；131072(安卓移动设备oaid的md5编码，32位，大写)；1048576（苹果移动设备caid）
     * @returns 
     */
    public async user_register_validate(userId: string, userIdType: number) {
        this.method = 'jd.union.open.user.register.validate'
        return await this.sendRequest({
            userStateReq: {
                userId,
                userIdType
            }
        })
    }

    /**
     * 批量创建推广位
     * @param unionId 需要创建的目标联盟id
     * @param key 推客unionid对应的“授权Key
     * @param unionType 3：私域推广位，上限5000个，不在联盟后台展示，无对应 PID；4：联盟后台推广位，上限500个，会在推客联盟后台展示，自动生成对应PID，可用于内容平台推广
     * @param type 站点类型 1.网站推广位2.APP推广位3.导购媒体推广位4.聊天工具推广位
     * @param spaceNameList 推广位名称集合，英文,分割；上限50
     * @param siteId 站点ID：网站的ID/app ID/snsID 。当type非4(聊天工具)时，siteId必填
     * @returns 
     */
    public async position_create(unionId: number, key: string, unionType: number, type: number, spaceNameList: string[], siteId: number) {
        this.method = 'jd.union.open.position.create'
        return await this.sendRequest({
            positionReq: {
                unionId,
                unionType,
                key,
                type,
                spaceNameList,
                siteId
            }
        })
    }

    /**
     * 查询推广位
     * @param unionId 需要查询的目标联盟id
     * @param key 推客unionid对应的“授权Key”
     * @param unionType 3：私域推广位，上限5000个，不在联盟后台展示，无对应 PID；4：联盟后台推广位，上限500个，会在推客联盟后台展示，可用于内容平台推广
     * @param pageIndex 页码，上限100
     * @param pageSize 每页条数，上限100
     * @returns 
     */
    public async position_query(unionId: number, key: string, unionType: number, pageIndex: number, pageSize: number = 20) {
        this.method = 'jd.union.open.position.query'
        return await this.sendRequest({
            positionReq: {
                unionId,
                key,
                unionType,
                pageIndex,
                pageSize
            }
        })
    }

    /**
     * 创建PID
     * @param unionId 联盟ID
     * @param childUnionId 子站长ID
     * @param promotionType 推广类型,1APP推广 2聊天工具推广
     * @param mediaName 媒体名称，即子站长的app应用名称，推广方式为app推广时必填，且app名称必须为已存在的app名称
     * @param positionName 子站长的推广位名称，如不存在则创建，不填则由联盟根据母账号信息创建
     * @returns 
     */
    public async user_pid_get(unionId: number, childUnionId: number, promotionType: number, mediaName: string, positionName?: string) {
        this.method = 'jd.union.open.user.pid.get'
        return await this.sendRequest({
            pidReq: {
                unionId,
                childUnionId,
                promotionType,
                mediaName,
                positionName
            }
        })
    }

    /**
     * 邀请码获取
     * @param inviteType 邀请类型：0-渠道邀请
     * @param channelType 备案场景：0-通用备案
     * @returns 
     */
    public async channel_invitecode_get(inviteType: number, channelType: number) {
        this.method = 'jd.union.open.channel.invitecode.get'
        return await this.sendRequest({
            channelInviteReq: {
                inviteType,
                channelType
            }
        })
    }

    /**
     * 渠道关系ID生成
     * @param inviteCode 邀请码
     * @param note 备注名：仅支持传入中文、字母、数字、下划线或中划线，最多15个字符
     * @returns 
     */
    public async channel_relation_get(inviteCode: string, note?: string) {
        this.method = 'jd.union.open.channel.relation.get'
        return await this.sendRequest({
            channelRelationGetReq: {
                inviteCode,
                note
            }
        })
    }

    /**
     * 渠道关系查询
     * @param channelRelationQueryReq 选填参数 参考官方API文档
     * @returns 
     */
    public async channel_relation_query(channelRelationQueryReq: { pageIndex?: number, pageSize?: number, channelId?: number }) {
        this.method = 'jd.union.open.channel.relation.query'
        return await this.sendRequest({
            channelRelationQueryReq
        })
    }


    /**
     * 发起请求
     * @param param 请求参数
     * @returns 
     */
    private async sendRequest(param) {
        let commonParam = {
            method: this.method,
            app_key: this.appkey,
            timestamp: format(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss'),
            format: "json",
            v: "1.0",
            sign_method: "md5",
            '360buy_param_json': ''
        }
        commonParam['360buy_param_json'] = JSON.stringify(param)
        let temp = this.secret
        for (const vo of Object.keys(commonParam).sort()) {
            temp += vo + commonParam[vo]
        }
        temp += this.secret
        commonParam['sign'] = crypto.createHash('md5').update(temp).digest('hex').toUpperCase();

        let api = new URL('https://api.jd.com/routerjson')
        for (const vo of Object.keys(commonParam).sort()) {
            api.searchParams.append(vo, commonParam[vo])
        }
        const { data } = await axios.get(api.href)
        if (data.error_response) {
            return data.error_response
        } else {
            return data[this.method.replace(/\./g, "_") + "_responce"]
        }
    }

}

export type IgoodsReqDTO = {
    cid1?: number,
    cid2?: number,
    cid3?: number,
    pageIndex?: number,
    pageSize?: number,
    skuIds?: number[],
    keyword?: string,
    pricefrom?: number,
    priceto?: number,
    commissionShareStart?: number,
    commissionShareEnd?: number,
    owner?: string,
    sortName?: string,
    sort?: string,
    isCoupon?: number,
    isPG?: number,
    pingouPriceStart?: number,
    pingouPriceEnd?: number,
    brandCode?: string,
    shopId?: number,
    hasContent?: number,
    hasBestCoupon?: number,
    pid?: string,
    fields?: string,
    forbidTypes?: string,
    jxFlags?: number[],
    shopLevelFrom?: number,
    isbn?: string,
    spuId?: number,
    couponUrl?: string,
    deliveryType?: number,
    eliteType?: number[],
    isSeckill?: number,
    isPresale?: number,
    isReserve?: number,
    bonusId?: number
}