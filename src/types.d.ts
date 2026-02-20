export interface Settings {
    Home?: {
    /**
         * [首页] 启用此标签页自定义功能
         *
         * 启用后可自定义首页标签页、顶栏按钮等内容。
         *
         * @defaultValue true
         */
        Switch?: boolean;
    /**
         * [首页] 标签页
         *
         * 请选择启用的首页标签页，建议不超过7个。
         *
         * @remarks
         *
         * Possible values:
         * - `'直播tab'` - 直播
         * - `'推荐tab'` - 推荐
         * - `'hottopic'` - 热门
         * - `'bangumi'` - 番剧
         * - `'anime'` - 动画（港澳台）
         * - `'film'` - 影视
         * - `'koreavtw'` - 韩综（港澳台）
         * - `'game'` - 游戏
         * - `'mctab'` - minecraft
         * - `'dhtr'` - 动画同人
         * - `'gaoxiao'` - 搞笑
         * - `'school'` - 校园
         * - `'kj'` - 数码
         *
         * @defaultValue ["直播tab","推荐tab","hottopic","bangumi","anime","film","koreavtw"]
         */
        Tab?: ('直播tab' | '推荐tab' | 'hottopic' | 'bangumi' | 'anime' | 'film' | 'koreavtw' | 'game' | 'mctab' | 'dhtr' | 'gaoxiao' | 'school' | 'kj')[];
    /**
         * [首页] 默认标签页
         *
         * 请选择启动APP时默认展示的标签页，需选择已启用的标签页。
         *
         * @remarks
         *
         * Possible values:
         * - `'直播tab'` - 直播
         * - `'推荐tab'` - 推荐
         * - `'hottopic'` - 热门
         * - `'bangumi'` - 番剧
         * - `'anime'` - 动画（港澳台）
         * - `'film'` - 影视
         * - `'koreavtw'` - 韩综（港澳台）
         * - `'game'` - 游戏
         * - `'mctab'` - minecraft
         * - `'dhtr'` - 动画同人
         * - `'gaoxiao'` - 搞笑
         * - `'school'` - 校园
         * - `'kj'` - 数码
         *
         * @defaultValue "推荐tab"
         */
        Tab_default?: '直播tab' | '推荐tab' | 'hottopic' | 'bangumi' | 'anime' | 'film' | 'koreavtw' | 'game' | 'mctab' | 'dhtr' | 'gaoxiao' | 'school' | 'kj';
    /**
         * [首页] 顶栏（左侧）按钮（用户头像）
         *
         * 请选择顶栏（左侧）按钮（用户头像）的作用（在biliBili粉色版中无法修改）。
         *
         * @remarks
         *
         * Possible values:
         * - `'mine'` - 用户中心-我的
         * - `'videoshortcut'` - 短视频
         *
         * @defaultValue "mine"
         */
        Top_left?: 'mine' | 'videoshortcut';
    /**
         * [首页] 顶栏（右侧）按钮
         *
         * 请选择启用的顶栏（右侧）按钮。
         *
         * @remarks
         *
         * Possible values:
         * - `'游戏中心Top'` - 游戏中心
         * - `'会员购Top'` - 会员购
         * - `'消息Top'` - 消息
         *
         * @defaultValue ["消息Top"]
         */
        Top?: ('游戏中心Top' | '会员购Top' | '消息Top')[];
};
    /**
     * [底部] 导航栏按钮
     *
     * 请选择启用的底部导航栏按钮，最多6个。
     *
     * @remarks
     *
     * Possible values:
     * - `'home'` - 首页
     * - `'频道Bottom'` - 频道
     * - `'dynamic'` - 动态
     * - `'publish'` - 发布
     * - `'ogv'` - 节目（港澳台）
     * - `'会员购Bottom'` - 会员购
     * - `'消息Bottom'` - 消息
     * - `'我的Bottom'` - 我的
     *
     * @defaultValue ["home","dynamic","ogv","会员购Bottom","我的Bottom"]
     */
    Bottom?: ('home' | '频道Bottom' | 'dynamic' | 'publish' | 'ogv' | '会员购Bottom' | '消息Bottom' | '我的Bottom')[];
    Region?: {
    /**
         * [分区] 启用此标签页自定义功能
         *
         * 启用后可自定义分区标签页的内容。
         *
         * @defaultValue true
         */
        Switch?: boolean;
};
    Mine?: {
    /**
         * [我的] 启用此标签页自定义功能
         *
         * 启用后可自定义我的标签页的服务内容。
         *
         * @defaultValue true
         */
        Switch?: boolean;
    iPad?: {
        /**
         * [我的 iPad版] 启用此标签页自定义功能
         *
         * 启用后可自定义iPad版我的标签页的服务内容。
         *
         * @defaultValue true
         */
        Switch?: boolean;
};
};
    /**
     * [储存] 配置类型
     *
     * 选择要使用的配置类型。未设置此选项或不通过此选项的旧版本的配置顺序依旧是 PersistentStore (BoxJs) > $argument > database。
     *
     * @remarks
     *
     * Possible values:
     * - `'Argument'` - 优先使用来自 $argument 的配置，$argument 不包含的设置项由 PersistentStore (BoxJs) 提供
     * - `'PersistentStore'` - 只使用 PersistentStore (BoxJs) 提供的配置
     * - `'database'` - 只使用由作者的 database.mjs 文件提供的默认配置，其他任何自定义配置不再起作用
     *
     * @defaultValue "Argument"
     */
    Storage?: 'Argument' | 'PersistentStore' | 'database';
    /**
     * [调试] 日志等级
     *
     * 选择脚本日志的输出等级，低于所选等级的日志将全部输出。
     *
     * @remarks
     *
     * Possible values:
     * - `'OFF'` - 关闭
     * - `'ERROR'` - ❌ 错误
     * - `'WARN'` - ⚠️ 警告
     * - `'INFO'` - ℹ️ 信息
     * - `'DEBUG'` - 🅱️ 调试
     * - `'ALL'` - 全部
     *
     * @defaultValue "WARN"
     */
    LogLevel?: 'OFF' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'ALL';
}
