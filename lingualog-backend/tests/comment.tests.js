const request = require('supertest');
const app = require('../app');  // Ensure this path is correct

describe('Comment API', () => {
    let createdCommentId;
    const testUserId = 1;  // Assume a user with ID 1 exists
    const testDiaryEntryId = 1;  // Assume a diary entry with ID 1 exists

    // Test creating a new comment
    it('POST /api/comments --> create comment', async () => {
        const response = await request(app)
            .post('/api/comments')
            .send({
                text: 'This is a test comment',
                diaryEntryId: testDiaryEntryId,
                userId: testUserId
            })
            .expect(200)
            .expect('Content-Type', /json/);
        createdCommentId = response.body.id;  // Save the created comment ID for later tests
        expect(response.body).toEqual({
            id: expect.any(Number),
            text: 'This is a test comment',
            diaryEntryId: testDiaryEntryId,
            userId: testUserId,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });

    // Test retrieving all comments
    it('GET /api/comments --> array of comments', async () => {
        await request(app)
            .get('/api/comments')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({ text: 'This is a test comment' })
                ]));
            });
    });

    // Test retrieving a single comment by ID
    it('GET /api/comments/:id --> specific comment by ID', async () => {
        await request(app)
            .get(`/api/comments/${createdCommentId}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual({
                    id: createdCommentId,
                    text: 'This is a test comment',
                    diaryEntryId: testDiaryEntryId,
                    userId: testUserId,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                });
            });
    });

    // Test updating a comment
    it('PUT /api/comments/:id --> update specific comment', async () => {
        await request(app)
            .put(`/api/comments/${createdCommentId}`)
            .send({
                text: 'Updated comment text',
                diaryEntryId: testDiaryEntryId,
                userId: testUserId
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual({
                    id: createdCommentId,
                    text: 'Updated comment text',
                    diaryEntryId: testDiaryEntryId,
                    userId: testUserId,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                });
            });
    });

    // Test deleting a comment
    it('DELETE /api/comments/:id --> delete specific comment', async () => {
        await request(app)
            .delete(`/api/comments/${createdCommentId}`)
            .expect(200)
            .expect(response => {
                expect(response.text).toEqual('Comment deleted');
            });

        // Verify the comment is actually deleted
        await request(app)
            .get(`/api/comments/${createdCommentId}`)
            .expect(404);
    });
});