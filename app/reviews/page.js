'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import StarRating from '@/components/StarRating';
import toast from 'react-hot-toast';
import { Loader2, MessageSquare } from 'lucide-react';

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (e) {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to submit review');
        return;
      }

      toast.success('Thanks for your feedback!');
      setComment('');
      setRating(5);
      fetchReviews();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-gold-400 font-semibold uppercase tracking-wide text-sm mb-2">
          Customer Reviews
        </p>
        <h1 className="font-display text-4xl font-bold mb-3">What People Say</h1>
        {reviews.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <StarRating rating={Math.round(avgRating)} size={20} />
            <span className="text-charcoal-300 text-sm">
              {avgRating} out of 5 ({reviews.length} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Submit review */}
      <div className="card-charcoal p-6 mb-10">
        <h2 className="font-display text-xl font-semibold mb-4">Leave a Review</h2>
        {session ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Your Rating</label>
              <StarRating rating={rating} size={28} interactive onChange={setRating} />
            </div>
            <div>
              <label className="block text-sm mb-1">Your Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Tell us about your experience..."
                className="input-dark"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-60">
              {submitting ? <Loader2 className="animate-spin" size={18} /> : <MessageSquare size={18} />}
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <p className="text-charcoal-300 text-sm">
            Please{' '}
            <Link href="/login" className="text-gold-400 font-medium hover:underline">
              log in
            </Link>{' '}
            to leave a review.
          </p>
        )}
      </div>

      {/* Reviews list */}
      {loading ? (
        <p className="text-center text-charcoal-400">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-charcoal-400">No reviews yet. Be the first to share your experience!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="card-charcoal p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{review.name}</h3>
                <StarRating rating={review.rating} size={16} />
              </div>
              <p className="text-charcoal-300 text-sm">{review.comment}</p>
              <p className="text-charcoal-500 text-xs mt-2">
                {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
