const request = require('supertest');
const app = require('../app');  // Ensure this path is correct

describe('DiaryEntry API', () => {
    let createdDiaryEntryId;
    const testUserId = 1;  // Assume there is already a user with ID 1

    // Test creating a new diary entry
    it('POST /api/diaryEntries --> create diary entry', async () => {
        const response = await request(app)
            .post('/api/diaryEntries')
            .send({
                title: 'My First Entry',
                content: 'This is my first diary entry',
                userId: testUserId
            })
            .expect(200)
            .expect('Content-Type', /json/);
        createdDiaryEntryId = response.body.id;  // Save the created entry ID for later tests
        expect(response.body).toEqual({
            id: expect.any(Number),
            title: 'My First Entry',
            content: 'This is my first diary entry',
            userId: testUserId,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });

    // Test retrieving all diary entries
    it('GET /api/diaryEntries --> array of diary entries', async () => {
        await request(app)
            .get('/api/diaryEntries')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({ title: 'My First Entry' })
                ]));
            });
    });

    // Test retrieving a single diary entry by ID
    it('GET /api/diaryEntries/:id --> specific diary entry by ID', async () => {
        await request(app)
            .get(`/api/diaryEntries/${createdDiaryEntryId}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual({
                    id: createdDiaryEntryId,
                    title: 'My First Entry',
                    content: 'This is my first diary entry',
                    userId: testUserId,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                });
            });
    });

    // Test updating a diary entry
    it('PUT /api/diaryEntries/:id --> update specific diary entry', async () => {
        await request(app)
            .put(`/api/diaryEntries/${createdDiaryEntryId}`)
            .send({
                title: 'Updated Entry',
                content: 'This is an updated diary entry',
                userId: testUserId
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual({
                    id: createdDiaryEntryId,
                    title: 'Updated Entry',
                    content: 'This is an updated diary entry',
                    userId: testUserId,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                });
            });
    });

    // Test deleting a diary entry
    it('DELETE /api/diaryEntries/:id --> delete specific diary entry', async () => {
        await request(app)
            .delete(`/api/diaryEntries/${createdDiaryEntryId}`)
            .expect(200)
            .expect(response => {
                expect(response.text).toEqual('Diary Entry deleted');
            });

        // Verify the diary entry is actually deleted
        await request(app)
            .get(`/api/diaryEntries/${createdDiaryEntryId}`)
            .expect(404);
    });
});