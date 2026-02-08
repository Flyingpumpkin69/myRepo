exports.testData = async (req,res) => {
try{
  res.status(201).json({
            success: true,
            message: 'Backend api is working.'
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};