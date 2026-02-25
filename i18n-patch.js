/**
 * EPhone i18n Patch
 * 1. Runtime DOM translation: auto-detect Chinese text and translate to English
 * 2. AI prompt injection: force AI to respond in Vietnamese
 */

(function () {
    'use strict';

    // ========================================
    // PART 1: Chinese → English Translation Dictionary
    // ========================================
    const dict = {
        // --- Common UI ---
        '保存': 'Save', '取消': 'Cancel', '确定': 'Confirm', '确认': 'Confirm',
        '编辑': 'Edit', '完成': 'Done', '添加': 'Add', '返回': 'Back',
        '下一步': 'Next', '关闭': 'Close', '重置': 'Reset', '上传': 'Upload',
        '发送': 'Send', '管理': 'Manage', '分享': 'Share', '删除': 'Delete',
        '发布': 'Publish', '刷新': 'Refresh', '搜索': 'Search', '移除': 'Remove',
        '结束': 'Finish', '详情': 'Details', '设置': 'Settings', '标题': 'Title',
        '内容': 'Content', '分类': 'Category', '名称': 'Name', '描述': 'Description',
        '状态': 'Status', '好的': 'OK', '错误': 'Error', '成功': 'Success',
        '警告': 'Warning', '加载中...': 'Loading...', '处理中...': 'Processing...',
        '请稍候...': 'Please wait...', '复制': 'Copy', '粘贴': 'Paste',
        '全选': 'Select All', '更多': 'More', '提交': 'Submit', '开始': 'Start',
        '停止': 'Stop', '暂停': 'Pause', '继续': 'Continue', '跳过': 'Skip',
        '是': 'Yes', '否': 'No', '启用': 'Enable', '禁用': 'Disable',
        '退出': 'Exit', '注销': 'Logout', '登录': 'Login',

        // --- Navigation ---
        '消息': 'Messages', '动态': 'Moments', '回忆': 'Memories',
        '收藏': 'Favorites', '好友动态': 'Friend Moments',
        '说说': 'Status', '相册': 'Album', '联系人': 'Contacts',

        // --- Chat ---
        '在线': 'Online', '离线': 'Offline', '输入消息...': 'Type a message...',
        '等待回复': 'Waiting for reply', '回复': 'Reply',
        '长截图': 'Long Screenshot', '删除(通知AI)': 'Delete (Notify AI)',
        '彻底删除': 'Permanently Delete', '聊天设置': 'Chat Settings',
        '长期记忆': 'Long-term Memory', '一起听': 'Listen Together',
        '群聊': 'Group Chat', '私聊': 'Private Chat',
        '语音通话': 'Voice Call', '视频通话': 'Video Call',
        '语音消息': 'Voice Message', '正在输入': 'Typing...',
        '消息已撤回': 'Message recalled', '对方正在输入...': 'Typing...',
        '聊天记录': 'Chat History', '清空聊天记录': 'Clear Chat History',

        // --- Wallet/Payment ---
        '余额': 'Balance', '转账': 'Transfer', '支付': 'Pay', '充值': 'Top Up',
        '余额支付': 'Balance Payment', '账户余额': 'Account Balance',
        '支付成功': 'Payment Successful', '支付失败': 'Payment Failed',
        '余额不足': 'Insufficient Balance', '充值成功': 'Top Up Successful',
        '收款成功': 'Payment Received', '已存入余额': 'Deposited to Balance',
        '交易成功': 'Transaction Successful', '交易取消': 'Transaction Cancelled',
        '交易时间': 'Transaction Time', '收入': 'Income', '支出': 'Expense',
        '钱包': 'Wallet', '红包': 'Red Packet', '专属红包': 'Exclusive Red Packet',
        '发红包': 'Send Red Packet', '需付款': 'Payment Required',
        '剩余支付时间': 'Payment Time Left', '总计': 'Total', '合计': 'Total',
        '买单': 'Pay the Bill', '为Ta买单': 'Pay for Them',
        '余额充值': 'Top Up Balance', '余额铁律': 'Balance Rules',
        '请输入有效的金额': 'Please enter a valid amount',
        '余额或亲属卡额度不足': 'Insufficient balance or family card limit',

        // --- Family Card (亲属卡) ---
        '亲属卡': 'Family Card', '亲属卡邀请': 'Family Card Invitation',
        '亲属卡消费': 'Family Card Purchase', '亲属卡转账': 'Family Card Transfer',
        '亲属卡已解绑': 'Family Card Unlinked',
        '亲属卡扣款成功': 'Family Card Deduction Successful',
        '对方消费 我买单': 'Their spending, I pay',
        '每月消费额度': 'Monthly Spending Limit',
        '本月剩余额度': 'Remaining Monthly Limit',
        '消费对方可见': 'Spending visible to them',
        '亲密付': 'Auto-Pay',
        '代付请求已被拒绝': 'Payment request rejected',
        '使用亲属卡消费了': 'spent using Family Card',
        '赠送的亲属卡': 'gifted Family Card',
        '为您代付成功': 'Payment on your behalf successful',
        '已开通': 'Activated', '已失效': 'Expired', '已拒收对方转账': 'Transfer declined',

        // --- Auction ---
        '竞拍': 'Bid', '拍卖': 'Auction', '竞拍成功': 'Bid Successful',
        '黑市拍卖': 'Black Market Auction', '拍卖开始': 'Auction Started',
        '底价': 'Starting Price', '出价': 'Bid', '举牌': 'Place Bid',
        '竞拍结束': 'Auction Ended', '成功拍得宝物': 'Successfully won the treasure',
        '不能低于当前价': 'Cannot be lower than current price',
        '稀世珍宝': 'Rare Treasure', '入手价': 'Purchase Price',
        '残忍拒绝': 'Decline', '查看详情': 'View Details',

        // --- World Book ---
        '世界书': 'World Book', '世界书设定': 'World Book Settings',
        '世界书规则': 'World Book Rules', '世界观': 'Worldview',
        '世界观法则': 'Worldview Rules', '世界观设定': 'Worldview Settings',
        '世界观融合': 'Worldview Integration',
        '编辑世界书': 'Edit World Book', '导入世界书': 'Import World Book',
        '书名': 'Book Name', '书名不能为空': 'Book name cannot be empty',
        '删除世界书': 'Delete World Book', '世界书分类': 'World Book Category',
        '内容条目': 'Content Entries',

        // --- Character/Preset ---
        '角色': 'Character', '人设': 'Character Profile', '预设': 'Preset',
        '人设库': 'Character Library', '人设预设': 'Character Presets',
        '角色卡': 'Character Card', '编辑预设': 'Edit Preset',
        '预设名称': 'Preset Name', '删除预设': 'Delete Preset',
        '预设已删除': 'Preset Deleted', '从角色卡导入': 'Import from Character Card',

        // --- Social/QZone ---
        '评论': 'Comment', '点赞': 'Like', '帖子': 'Post',
        '发帖': 'New Post', '转发': 'Repost', '表情': 'Sticker',
        '删除表情': 'Delete Sticker', '删除成功': 'Deleted Successfully',
        '选中的表情已成功删除': 'Selected stickers deleted successfully',

        // --- Group ---
        '群名': 'Group Name', '群成员': 'Group Members', '群头像': 'Group Avatar',
        '群公告': 'Group Notice', '创建群聊': 'Create Group', '退出群聊': 'Leave Group',
        '成员': 'Members',

        // --- NPC ---
        '添加 NPC': 'Add NPC', '编辑 NPC': 'Edit NPC',
        'NPC 头像': 'NPC Avatar', 'NPC 昵称': 'NPC Nickname',
        'NPC 人设': 'NPC Persona',

        // --- API/Settings ---
        'API 设置': 'API Settings', '语言': 'Language',
        '主API设置': 'Primary API Settings', '密钥': 'API Key',
        '模型': 'Model', '保存所有设置': 'Save All Settings',
        '导出数据': 'Export Data', '导入备份文件': 'Import Backup',
        '清理冗余数据': 'Cleanup Redundant Data',
        '高级数据清理': 'Advanced Data Cleanup',
        '数据检查与修复': 'Data Check & Repair',
        '一键压缩本地图片': 'Compress Local Images',

        // --- Appearance ---
        '外观设置': 'Appearance', '字体': 'Font', '字体设置': 'Font Settings',
        '主题': 'Theme', '渲染器': 'Renderer', '渲染规则': 'Rendering Rules',
        '保存并应用': 'Save and Apply', '恢复默认字体': 'Reset to Default Font',
        '主题预设已保存': 'Theme preset saved',

        // --- CPhone ---
        '选择一部手机': 'Select a Phone', '备忘录': 'Memo', '日记': 'Diary',
        '浏览器': 'Browser', '高德地图': 'Map', '足迹': 'Footprints',
        '网易云': 'Music', 'App记录': 'App Usage',

        // --- Shopping/Inventory ---
        '购物车': 'Shopping Cart', '商品': 'Product', '下单': 'Place Order',
        '订单': 'Order', '仓库': 'Inventory', '仓库空空如也': 'Inventory is empty',
        '款式名称': 'Variant Name', '价格': 'Price', '数量': 'Quantity',
        '购买': 'Buy', '卖出': 'Sell', '买入基金': 'Buy Fund',
        '买入成功': 'Purchase Successful', '买入金额': 'Purchase Amount',
        '卖出金额': 'Sell Amount', '费率': 'Fee Rate',

        // --- Food Delivery ---
        '外卖美食': 'Food Delivery', '美团外卖': 'Meituan Delivery',
        '请慢用': 'Enjoy your meal',

        // --- Games ---
        '狼人杀': 'Werewolf', '五子棋': 'Gomoku', '下棋历史': 'Game History',

        // --- Music/Media ---
        '歌单': 'Playlist', '播放列表': 'Playlist', '切歌': 'Next Song',
        '一起读书模式': 'Read Together Mode', '乐谱': 'Sheet Music',
        '作曲': 'Compose', '乐器类型': 'Instrument Type', '乐曲名称': 'Track Name',

        // --- Weather ---
        '湿度': 'Humidity', '中雨': 'Moderate Rain', '小雨': 'Light Rain',
        '大雨': 'Heavy Rain', '中雪': 'Moderate Snow', '小雪': 'Light Snow',
        '大雪': 'Heavy Snow', '晴': 'Clear', '多云': 'Cloudy', '阴': 'Overcast',

        // --- Memory/AI ---
        '记忆': 'Memory', '记忆总结': 'Memory Summary', '核心记忆': 'Core Memory',
        '参考记忆': 'Reference Memory', '三核思考': 'Triple-Core Thinking',
        '内心独白': 'Inner Monologue', '上下文': 'Context',
        '上下文参考': 'Context Reference', '上下文数据': 'Context Data',

        // --- Data Management ---
        '导出': 'Export', '导入': 'Import', '备份': 'Backup', '恢复': 'Restore',
        '上传成功': 'Upload Successful', '上传失败': 'Upload Failed',
        '上传中断': 'Upload Interrupted', '上传超时': 'Upload Timeout',
        '下载': 'Download', '下载失败': 'Download Failed',
        '下载图片': 'Download Image', '下载图片失败': 'Download Image Failed',

        // --- Dialogs/Alerts ---
        '确认删除': 'Confirm Delete', '确定要删除吗': 'Are you sure you want to delete',
        '此操作不可撤销': 'This action cannot be undone',
        '此操作不可恢复': 'This action cannot be recovered',
        '严重警告': 'Serious Warning',
        '确认清理冗余数据': 'Confirm cleanup of redundant data',
        '语言已切换': 'Language switched',
        '页面即将刷新以应用更改': 'Page will reload to apply changes',
        '不支持的文件格式': 'Unsupported file format',
        '请输入': 'Please enter', '不能为空': 'cannot be empty',
        '找不到': 'Cannot find', '已被删除': 'has been deleted',
        '请先': 'Please first', '请选择': 'Please select',
        '操作成功': 'Operation successful', '操作失败': 'Operation failed',

        // --- Time ---
        '上午': 'AM', '下午': 'PM', '今天': 'Today', '昨天': 'Yesterday',
        '刚刚': 'Just now', '分钟前': 'minutes ago', '小时前': 'hours ago',
        '天前': 'days ago', '个月前': 'months ago',

        // --- Misc ---
        '教程': 'Tutorial', '豆瓣': 'Douban', '淘宝': 'Taobao',
        '位置分享': 'Location Share', '位置名': 'Location Name',
        '感谢您的惠顾': 'Thank you for your patronage',
        '欢迎再次光临': 'Welcome back',
        '一键复制': 'Copy All', '仅我可见': 'Only Me',
        '上传头像': 'Upload Avatar', '从本地上传': 'Upload from Local',
        '从本地文件': 'From Local File', '头像': 'Avatar',
        '头像框': 'Avatar Frame', '昵称': 'Nickname',
        '签名': 'Signature', '个性签名': 'Bio',
        '待办': 'To-do', '待办事项': 'To-do List',
        '赠': 'Gift', '注册成功': 'Registration Successful',
        '注册失败': 'Registration Failed', '投票': 'Vote',
        '注册': 'Register',
    };

    // Sort by length descending so longer phrases match first
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

    // Build a regex that matches any dictionary key
    const escapedKeys = sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const dictRegex = new RegExp(escapedKeys.join('|'), 'g');

    // Check if a string contains Chinese characters
    function hasChinese(text) {
        return /[\u4e00-\u9fff]/.test(text);
    }

    // Translate a text string using the dictionary
    function translateText(text) {
        if (!hasChinese(text)) return text;
        return text.replace(dictRegex, match => dict[match] || match);
    }

    // Process a single DOM node
    function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (hasChinese(node.textContent)) {
                const translated = translateText(node.textContent);
                if (translated !== node.textContent) {
                    node.textContent = translated;
                }
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Skip script/style tags
            const tag = node.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return;

            // Translate attributes
            ['placeholder', 'title', 'alt', 'aria-label'].forEach(attr => {
                const val = node.getAttribute(attr);
                if (val && hasChinese(val)) {
                    node.setAttribute(attr, translateText(val));
                }
            });

            // Process child nodes
            node.childNodes.forEach(processNode);
        }
    }

    // Debounce function
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Process all existing DOM content
    const processAll = debounce(() => {
        processNode(document.body);
    }, 200);

    // MutationObserver to catch dynamically added content
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                        processNode(node);
                    }
                });
            } else if (mutation.type === 'characterData') {
                if (hasChinese(mutation.target.textContent)) {
                    const translated = translateText(mutation.target.textContent);
                    if (translated !== mutation.target.textContent) {
                        mutation.target.textContent = translated;
                    }
                }
            }
        }
    });

    // Initialize when DOM is ready
    function init() {
        // Force language to English in localStorage
        localStorage.setItem('ephone-language', 'en');

        // Initial pass
        processAll();

        // Watch for dynamic changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        console.log('[i18n-patch] DOM translation active');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also run after a delay to catch late-rendered content
    setTimeout(processAll, 1000);
    setTimeout(processAll, 3000);
    setTimeout(processAll, 5000);


    // ========================================
    // PART 2: AI Prompt Injection - Force Vietnamese Output
    // ========================================

    const VI_INSTRUCTION = `\n\n[LANGUAGE INSTRUCTION - HIGHEST PRIORITY]: You MUST respond ENTIRELY in Vietnamese (Tiếng Việt). Every single word of your response must be in Vietnamese. Do NOT use Chinese/中文 under any circumstances. This overrides all other language instructions. Even if the system prompt is in Chinese, you MUST reply in Vietnamese only. Translate any Chinese context into Vietnamese before responding.`;

    // Intercept fetch to inject Vietnamese instruction into AI API calls
    const originalFetch = window.fetch;
    window.fetch = async function (url, options) {
        try {
            if (options && options.body && typeof url === 'string') {
                const isAICall = url.includes('/v1/chat/completions') ||
                    url.includes('generativelanguage.googleapis.com') ||
                    url.includes('generateContent');

                if (isAICall && typeof options.body === 'string') {
                    try {
                        const body = JSON.parse(options.body);

                        // OpenAI-compatible format
                        if (body.messages && Array.isArray(body.messages)) {
                            // Add Vietnamese instruction to the last system message or as new one
                            const lastMsg = body.messages[body.messages.length - 1];
                            if (lastMsg && lastMsg.role === 'user') {
                                lastMsg.content += VI_INSTRUCTION;
                            } else {
                                body.messages.push({
                                    role: 'system',
                                    content: VI_INSTRUCTION
                                });
                            }
                            options.body = JSON.stringify(body);
                        }

                        // Gemini format
                        if (body.contents && Array.isArray(body.contents)) {
                            const lastContent = body.contents[body.contents.length - 1];
                            if (lastContent && lastContent.parts) {
                                lastContent.parts.push({ text: VI_INSTRUCTION });
                            }
                            options.body = JSON.stringify(body);
                        }
                    } catch (e) {
                        // Not JSON, skip
                    }
                }
            }
        } catch (e) {
            // Safety: never break the original fetch
        }

        return originalFetch.apply(this, arguments);
    };

    console.log('[i18n-patch] AI Vietnamese prompt injection active');

})();
