import React, { useState } from "react";
import { X, AlertTriangle, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function DisputeModal({ isOpen, onClose, orderId, onDispute }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disputeReasons = [
    "Wrong order received",
    "Missing items",
    "Poor food quality",
    "Late delivery",
    "Damaged packaging",
    "Other"
  ];

  const handleSubmit = async () => {
    if (!reason || !description.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save dispute to localStorage
      const disputes = JSON.parse(localStorage.getItem('ucsc_disputes') || '[]');
      disputes.push({
        id: Date.now().toString(),
        orderId,
        reason,
        description,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ucsc_disputes', JSON.stringify(disputes));
      
      onDispute({ reason, description });
      onClose();
    } catch (error) {
      console.error('Error submitting dispute:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Dispute Order</h3>
              <p className="text-sm text-gray-500">Order #{orderId}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Reason Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">
              What's the issue?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {disputeReasons.map((disputeReason) => (
                <button
                  key={disputeReason}
                  onClick={() => setReason(disputeReason)}
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    reason === disputeReason
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {disputeReason}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-900 mb-2 block">
              Please provide more details
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> We'll review your dispute within 24 hours and contact you via email with a resolution.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!reason || !description.trim() || isSubmitting}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Dispute
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
