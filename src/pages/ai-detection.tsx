import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/authStore';
import useAIDetectionStore from '@/store/aiDetectionStore';
import Button from '@/components/common/Button';


export default function AIDetection() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [content, setContent] = useState('');
  const [aiResult, setAIResult] = useState<{
    score: number | null;
    isAI: boolean | null;
  } | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { detectedTexts, isLoading, fetchDetectedTexts, detectAIContent, deleteDetectedText } = useAIDetectionStore();

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await deleteDetectedText(deleteId);
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      fetchDetectedTexts();
    }
  }, [isAuthenticated, router, fetchDetectedTexts]);

  const handleDetect = async () => {
    if (!content.trim()) return;
    
    setAIResult(null);
    console.log("AI Result", aiResult)
    try {
      await detectAIContent(content);
    } catch (error) {
      console.error('Error during detection:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-8">AI Content Detector</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Input and Results */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your content here and click Detect AI Content button
            </label>
            <textarea
              id="content"
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="text-right">
            <span className="text-sm text-gray-500 mr-2">
              Words Limit/Search: {content.split(/\s+/).filter(Boolean).length}/2000
            </span>
            <Button
              onClick={handleDetect}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading || content.trim() === ''}
            >
              {isLoading ? 'Analyzing...' : 'Detect AI Content'}
            </Button>
          </div>
        </div>
        
        {/* Right side - Detection Results */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">Human Content Score</h2>
          
          <div className="bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg p-6 text-center">
            <div className="text-xl font-bold mb-2">
              👍 Add Content To Detect AI Generated
            </div>
            
            {detectedTexts && detectedTexts.length > 0 && detectedTexts[0].isAI !== null ? (
              <div className="mt-4">
                <div className={`text-lg font-bold py-2 px-4 rounded ${detectedTexts[0].isAI ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  {detectedTexts[0].isAI ? 'AI Written Content' : 'Human Written Content'}
                </div>
                
                {detectedTexts[0].score !== null && (
                  <div className="mt-2 text-gray-700">
                    Confidence Score: {(detectedTexts[0].score).toFixed(2)}%
                  </div>
                )}
              </div>
            ) : (
              <div className="text-lg font-bold py-2 px-4 rounded bg-gray-200 text-gray-600">
                No detection results yet
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">About AI Content Detection</h3>
            <p className="text-gray-700 text-sm">
              Our AI detector uses advanced machine learning to analyze text patterns. 
              Results are not guaranteed and should be used as guidance only. Multiple factors 
              can influence detection accuracy including text length and complexity.
            </p>
          </div>
        </div>
      </div>
      
      {/* History of Detection Results */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Detection History</h2>
        
        {detectedTexts && detectedTexts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {detectedTexts.map((text) => (
                  <tr key={text.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 max-w-md truncate">{text.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${text.isAI ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {text.isAI ? 'AI' : 'Human'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {text.score !== null ? `${(text.score).toFixed(2)}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(text.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(text.id)}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No detection history found. Start by detecting some content above.
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this detection result? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}