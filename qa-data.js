// 从localStorage加载数据或使用默认数据存储
let qaData = localStorage.getItem('qaData') ? JSON.parse(localStorage.getItem('qaData')) : {
    // 热点问题
    hotQuestions: [
        {
            id: 'hot1',
            title: '留学生可以申请奖学金吗？',
            content: '想了解留学生可以申请哪些奖学金？',
            author: '王同学',
            contactInfo: '13800138000',
            date: '2024-02-10',
            views: 1280,
            isHot: true,
            isVisible: true,
            status: 'answered',
            answer: {
                content: '是的，我校为国际学生提供多种奖学金计划：\n- 学术优秀奖学金：覆盖100%学费\n- 文化交流奖学金：覆盖50%学费\n- 语言进步奖学金：提供语言课程补贴',
                date: '2024-02-11',
                adminName: '招生办'
            }
        }
    ],

    // 已回复问题
    answeredQuestions: [
        {
            id: 'ans1',
            title: '申请材料需要公证吗？',
            content: '我想问一下提交的成绩单和毕业证是否需要公证？',
            author: '张同学',
            contactInfo: 'zhang@example.com',
            date: '2024-02-08',
            views: 856,
            status: 'answered',
            isVisible: true,
            answer: {
                content: '是的，所有学历文件都需要公证，具体要求如下：\n- 成绩单需要中文和英文公证\n- 毕业证需要中文和英文公证\n- 公证材料需要在半年有效期内',
                date: '2024-02-09',
                adminName: '招生办'
            }
        }
    ],

    // 待回复问题
    pendingQuestions: [
        {
            id: 'pend1',
            title: '关于住宿安排的问题',
            content: '请问学校宿舍是几人间？有独立卫浴吗？',
            author: '李同学',
            contactInfo: '',
            date: '2024-02-12',
            views: 245,
            status: 'pending',
            isVisible: true
        }
    ]
};

// 生成唯一ID
function generateId() {
    return 'q' + Date.now() + Math.random().toString(36).substr(2, 5);
}

// 添加新问题
function addNewQuestion(question) {
    const newQuestion = {
        id: generateId(),
        ...question,
        views: 0,
        status: 'pending',
        isVisible: true, // 新提交的问题默认可见
        date: new Date().toISOString().split('T')[0],
        contactInfo: question.contactInfo || '' // 确保即使没有提供联系方式也有一个空字符串
    };
    
    // 添加到待回复问题列表
    qaData.pendingQuestions.unshift(newQuestion);
    
    // 保存到localStorage
    saveToLocalStorage();
    
    return newQuestion;
}

// 更新问题状态
function updateQuestionStatus(questionId, newStatus, answer = null) {
    let question = null;
    let sourceArray = null;
    let targetArray = null;

    // 查找问题
    [qaData.hotQuestions, qaData.answeredQuestions, qaData.pendingQuestions].forEach(array => {
        const found = array.find(q => q.id === questionId);
        if (found) {
            question = found;
            sourceArray = array;
        }
    });

    if (!question) return null;

    // 确定目标数组
    if (newStatus === 'answered') {
        targetArray = qaData.answeredQuestions;
    } else if (newStatus === 'hot') {
        targetArray = qaData.hotQuestions;
    } else {
        targetArray = qaData.pendingQuestions;
    }

    // 从源数组中移除
    if (sourceArray) {
        sourceArray.splice(sourceArray.indexOf(question), 1);
    }

    // 更新问题状态和答案
    question.status = newStatus;
    if (answer) {
        question.answer = {
            ...answer,
            date: new Date().toISOString().split('T')[0]
        };
    }

    // 添加到目标数组
    targetArray.unshift(question);

    // 保存更改
    saveToLocalStorage();

    return question;
}

// 增加浏览量
function incrementViews(questionId) {
    [qaData.hotQuestions, qaData.answeredQuestions, qaData.pendingQuestions].forEach(array => {
        const question = array.find(q => q.id === questionId);
        if (question) {
            question.views = (question.views || 0) + 1;
        }
    });
    saveToLocalStorage();
}

// 从localStorage加载数据
function loadFromLocalStorage() {
    const saved = localStorage.getItem('qaData');
    if (saved) {
        const parsed = JSON.parse(saved);
        qaData.hotQuestions = parsed.hotQuestions || [];
        qaData.answeredQuestions = parsed.answeredQuestions || [];
        qaData.pendingQuestions = parsed.pendingQuestions || [];
    }
}

// 保存数据到localStorage
function saveToLocalStorage() {
    localStorage.setItem('qaData', JSON.stringify(qaData));
}

// 初始化加载
loadFromLocalStorage();
