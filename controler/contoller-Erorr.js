module.exports = (err, req, res, next) => {
    // console.log(err.stack)
    // err.statusCode = err.statusCode || 500;
    console.log(err.statusCode)
    // err.status = err.status || 'error';
    console.log(err.status)
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}

// عندما تقوم بتمرير الكائن AppError كمعلمة لـ next()،
//  يتم تمرير الكائن بأكمله.وبالتالي، يمكنك الوصول إلى جميع الخصائص التي تم تعريفها في كائن AppError
//   داخل دالة التعامل مع الخطأ باستخدام المعلمة err.



// يعني اصبح اقدر اصل لجميع خصائص AppError  من خلال معامل err

/*
نعم، بالضبط! عند تمرير كائن  
`AppError` 
إلى دالة `next()` كمعامل
 يمكنك الوصول إلى جميع خصائص هذا الكائن داخل دالة التعامل مع الخطأ التي تم تعريفها باستخدام`
 app.use()`
  باستخدام المعلمة`err`.
    لذا، يمكنك الوصول إلى جميع الخصائص التي تم تعريفها في كائن 
    `AppError`،
 مثل
 `statusCode` و `status` و `message` 
 وأي خصائص أخرى، باستخدام`err`.
 هذا يجعل من السهل إدارة والاستفادة من الأخطاء المخصصة التي تم إنشاؤها باستخدام`AppError`.*/